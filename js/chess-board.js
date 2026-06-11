/* Shared chess board diagram renderer — used by Chess section pages.
   Renders an 8x8 static diagram using SVG piece graphics (lichess
   "cburnett" piece set) inside a target element. New, additive file —
   does not modify script.js and is only loaded by pages that opt in.

   Usage:
     <div class="chess-board" id="board-1"></div>
     <script>
       renderChessBoard('board-1', {
         e1: 'wK', e8: 'bK', a1: 'wR', h8: 'bR'
       }, {
         highlight: { e1: 'highlight', e8: 'target' },
         flipped: false
       });
     </script>

   Piece codes: colour prefix 'w'/'b' + piece letter K, Q, R, B, N, P
   (e.g. 'wK' = white king, 'bP' = black pawn). Square names are standard
   algebraic notation, e.g. 'e4'. */

(function (global) {
    var PIECE_IMG_BASE = 'https://lichess1.org/assets/piece/cburnett/';

    function renderChessBoard(elementId, pieces, options) {
        options = options || {};
        var el = document.getElementById(elementId);
        if (!el) return;

        el.classList.add('chess-board');
        el.innerHTML = '';

        var files = 'abcdefgh';
        var highlight = options.highlight || {};
        var ranks = [7, 6, 5, 4, 3, 2, 1, 0];
        var fileIdx = [0, 1, 2, 3, 4, 5, 6, 7];

        if (options.flipped) {
            ranks = ranks.slice().reverse();
            fileIdx = fileIdx.slice().reverse();
        }

        for (var ri = 0; ri < ranks.length; ri++) {
            var r = ranks[ri];
            for (var ci = 0; ci < fileIdx.length; ci++) {
                var c = fileIdx[ci];
                var sq = files[c] + (r + 1);
                var div = document.createElement('div');
                div.className = 'sq ' + ((r + c) % 2 === 0 ? 'dark' : 'light');

                var hl = highlight[sq];
                if (hl) {
                    var classes = hl.split(/\s+/);
                    for (var k = 0; k < classes.length; k++) {
                        if (classes[k]) div.classList.add(classes[k]);
                    }
                }

                var piece = pieces[sq];
                if (piece) {
                    var img = document.createElement('img');
                    img.className = 'piece-img';
                    img.src = PIECE_IMG_BASE + piece + '.svg';
                    img.alt = piece;
                    img.draggable = false;
                    div.appendChild(img);
                }

                el.appendChild(div);
            }
        }
    }

    global.renderChessBoard = renderChessBoard;
})(window);
