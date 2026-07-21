/* Interactive game viewer - auto-activates on any page with a .move-list.
   Parses the move notation, wraps each half-move in a clickable token,
   inserts a live chess board above the moves, and updates it on click.
   Depends on: chess-board.js (renderChessBoard) and chess-board.css.
   Loads chess.js 0.10.3 from CDN for position tracking. */

(function () {
    /* Inject viewer styles */
    var style = document.createElement('style');
    style.textContent = [
        '.gv-wrap{display:flex;flex-wrap:wrap;gap:1.5rem;align-items:flex-start;margin:1rem 0;}',
        '.gv-board-col{flex:0 0 auto;}',
        '.gv-moves-col{flex:1 1 220px;min-width:0;font-family:"Courier New",monospace;line-height:1.85;background:rgba(108,142,191,0.08);border-radius:8px;padding:1rem;max-height:380px;overflow-y:auto;}',
        '.gv-move{cursor:pointer;padding:1px 3px;border-radius:3px;transition:background .15s;}',
        '.gv-move:hover{background:rgba(108,142,191,0.25);}',
        '.gv-move.gv-active{background:rgba(108,142,191,0.45);font-weight:600;}',
        '.gv-move-num{color:var(--text-muted,#9aa0a6);user-select:none;}',
        '.gv-result{font-weight:700;margin-left:.4rem;}',
        '.gv-ann{font-size:.8em;vertical-align:super;line-height:0;font-family:sans-serif;}',
        '.gv-ann-good{color:#22c55e;}',
        '.gv-ann-bad{color:#ef4444;}',
        '.gv-ann-interesting{color:#f97316;}',
        '.gv-ann-dubious{color:#a78bfa;}',
        '.chess-board .sq.light.gv-last-move{background:#cdd26a!important;}',
        '.chess-board .sq.dark.gv-last-move{background:#aaa23a!important;}',
        '.chess-board .sq.light.gv-check{background:radial-gradient(ellipse at center,#f0d9b5 0%,rgba(220,0,0,0.85) 100%)!important;}',
        '.chess-board .sq.dark.gv-check{background:radial-gradient(ellipse at center,#b58863 0%,rgba(220,0,0,0.85) 100%)!important;}'
    ].join('');
    document.head.appendChild(style);

    function fenToPieces(fen) {
        var pieces = {};
        var board = fen.split(' ')[0];
        var rows = board.split('/');
        var files = 'abcdefgh';
        for (var r = 0; r < 8; r++) {
            var row = rows[r], f = 0;
            for (var c = 0; c < row.length; c++) {
                var ch = row[c];
                if (/\d/.test(ch)) { f += parseInt(ch); }
                else {
                    var sq = files[f] + (8 - r);
                    pieces[sq] = (ch === ch.toUpperCase() ? 'w' : 'b') + ch.toUpperCase();
                    f++;
                }
            }
        }
        return pieces;
    }

    var INIT_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

    function splitAnn(token) {
        /* Separate SAN from trailing annotation symbols !!, ??, !?, ?!, !, ? */
        var m = token.match(/^(.*?)([!?]{1,2})?$/);
        return { san: m[1] || token, ann: m[2] || '' };
    }

    function annClass(ann) {
        if (ann === '!!' || ann === '!') return 'good';
        if (ann === '??' || ann === '?') return 'bad';
        if (ann === '!?') return 'interesting';
        if (ann === '?!') return 'dubious';
        return '';
    }

    function parseMoves(text) {
        /* Strip result markers */
        text = text
            .replace(/1\s*[--]\s*0|0\s*[--]\s*1|1\/2\s*[--]\s*1\/2|½\s*[--]\s*½/g, '')
            .replace(/--/g, '')
            .replace(/(\d+\.+)([A-Za-z])/g, '$1 $2')
            .replace(/\s+/g, ' ').trim();

        var words = text.split(' ');
        var tokens = [];
        var moveNum = 0;
        var color = 'w';

        for (var i = 0; i < words.length; i++) {
            var w = words[i];
            if (!w) continue;

            if (/^\d+\.+$/.test(w)) {
                moveNum = parseInt(w, 10);
                color = w.indexOf('...') !== -1 ? 'b' : 'w';
                continue;
            }

            if (/^[A-Za-z]/.test(w)) {
                var parts = splitAnn(w);
                var san = parts.san;
                var ann = parts.ann;
                /* Strip check/mate/ann from SAN for chess.js */
                var chessSan = san.replace(/[+#]+$/, '');
                if (chessSan) {
                    tokens.push({ san: chessSan, display: san, ann: ann, moveNum: moveNum, color: color });
                    color = color === 'w' ? 'b' : 'w';
                }
            }
        }
        return tokens;
    }

    function kingSquare(chess) {
        var color = chess.turn();
        var files = 'abcdefgh';
        for (var r = 1; r <= 8; r++) {
            for (var fi = 0; fi < 8; fi++) {
                var sq = files[fi] + r;
                var p = chess.get(sq);
                if (p && p.type === 'k' && p.color === color) return sq;
            }
        }
        return null;
    }

    function playToIndex(tokens, idx) {
        var chess = new Chess();
        var lastValid = -1;
        var lastFrom = null, lastTo = null;
        for (var i = 0; i <= idx; i++) {
            var result = chess.move(tokens[i].san, { sloppy: true });
            if (!result) break;
            lastValid = i;
            lastFrom = result.from;
            lastTo = result.to;
        }
        return { fen: chess.fen(), lastValid: lastValid, from: lastFrom, to: lastTo };
    }

    function buildTokenHTML(tokens) {
        var html = '';
        var i = 0;
        while (i < tokens.length) {
            var t = tokens[i];
            html += '<span class="gv-move-num">' + t.moveNum + '.</span> ';
            html += moveSpan(t, i);
            i++;
            if (i < tokens.length && tokens[i].color === 'b') {
                html += ' ' + moveSpan(tokens[i], i);
                i++;
            }
            html += ' ';
        }
        return html;
    }

    function moveSpan(t, idx) {
        var annHtml = '';
        if (t.ann) {
            var cls = annClass(t.ann);
            annHtml = '<span class="gv-ann' + (cls ? ' gv-ann-' + cls : '') + '">' + escHtml(t.ann) + '</span>';
        }
        return '<span class="gv-move" data-idx="' + idx + '">' + escHtml(t.display) + annHtml + '</span>';
    }

    function escHtml(s) {
        return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function extractResult(text) {
        var m = text.match(/1-0|0-1|1\/2-1\/2|½-½/);
        return m ? m[0] : '';
    }

    function setupViewer(moveList) {
        var raw = moveList.textContent || '';
        var result = extractResult(raw);
        var tokens = parseMoves(raw);
        if (tokens.length < 2) return;

        var boardId = 'gv-' + Math.random().toString(36).substr(2, 8);
        var boardDiv = document.createElement('div');
        boardDiv.id = boardId;

        var boardCol = document.createElement('div');
        boardCol.className = 'gv-board-col';
        boardCol.appendChild(boardDiv);

        var movesCol = document.createElement('div');
        movesCol.className = 'gv-moves-col';
        movesCol.innerHTML = buildTokenHTML(tokens);
        if (result) {
            var res = document.createElement('span');
            res.className = 'gv-result';
            res.textContent = result;
            movesCol.appendChild(res);
        }

        var wrap = document.createElement('div');
        wrap.className = 'gv-wrap';
        wrap.appendChild(boardCol);
        wrap.appendChild(movesCol);

        moveList.parentNode.replaceChild(wrap, moveList);

        var currentIdx = -1;

        function goTo(idx) {
            currentIdx = idx;
            var spans = movesCol.querySelectorAll('.gv-move');

            if (currentIdx < 0) {
                renderChessBoard(boardId, fenToPieces(INIT_FEN));
                spans.forEach(function (s) { s.classList.remove('gv-active'); });
                movesCol.scrollTop = 0;
                return;
            }

            var safeIdx = Math.min(currentIdx, tokens.length - 1);
            var res = playToIndex(tokens, safeIdx);
            var hl = {};
            if (res.from) hl[res.from] = 'gv-last-move';
            if (res.to) hl[res.to] = 'gv-last-move';
            var tempChess = new Chess(res.fen);
            if (tempChess.in_check()) {
                var kSq = kingSquare(tempChess);
                if (kSq) hl[kSq] = (hl[kSq] ? hl[kSq] + ' ' : '') + 'gv-check';
            }
            renderChessBoard(boardId, fenToPieces(res.fen), { highlight: hl });

            spans.forEach(function (s) {
                s.classList.toggle('gv-active', parseInt(s.dataset.idx) === safeIdx);
            });

            var activeSpan = movesCol.querySelector('.gv-move.gv-active');
            if (activeSpan) {
                activeSpan.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            }
        }

        /* Render starting position */
        renderChessBoard(boardId, fenToPieces(INIT_FEN));

        /* Click handler */
        movesCol.addEventListener('click', function (e) {
            var span = e.target.closest('.gv-move');
            if (!span) return;
            goTo(parseInt(span.dataset.idx));
        });

        /* Keyboard navigation */
        document.addEventListener('keydown', function (e) {
            var tag = document.activeElement && document.activeElement.tagName;
            if (tag === 'INPUT' || tag === 'TEXTAREA') return;

            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                if (currentIdx >= 0) goTo(currentIdx - 1);
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                if (currentIdx < tokens.length - 1) goTo(currentIdx + 1);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (currentIdx >= 0) goTo(-1);
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (currentIdx < tokens.length - 1)
                goTo(tokens.length - 1);
            }
        });
    }

    function init() {
        document.querySelectorAll('.move-list').forEach(setupViewer);
    }

    if (!window.Chess) {
        console.warn('game-viewer: Chess not found - load chess.js before game-viewer.js');
        return;
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
