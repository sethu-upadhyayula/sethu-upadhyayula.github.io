// Homepage pie geometry: each of the 6 sections gets an angular slice extending all
// the way to the viewport's rectangular edges (not an inscribed ellipse). Slice ANGLES
// are chosen so every slice covers equal on-screen area, computed numerically since a
// rectangle (unlike an ellipse) has no closed-form equal-area angle formula. Recomputed
// on load and on resize since it depends on live viewport dimensions.

(function () {
    // Order/direction matches the previous design: consecutive slices starting at
    // 0deg/3-o'clock, going clockwise (screen y grows downward, so increasing angle
    // here reads clockwise on screen). Puts Math/Quant/Chess across the top half and
    // Bio/Dev/Music across the bottom half, each reading left-to-right.
    const SECTIONS = ["music", "dev", "biology", "math", "quant", "chess"];

    const SAMPLES = 3600; // angular resolution for the numeric area integration

    function debounce(fn, wait) {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), wait);
        };
    }

    // Distance from the center to the rectangle's own boundary along a ray at angle
    // theta (0 = pointing right, increasing clockwise on screen). Every point on a
    // rectangle centered at the origin is reachable this way (the rectangle is
    // star-shaped w.r.t. its center), so this is well-defined for every theta.
    function rectBoundaryRadius(halfW, halfH, theta) {
        const c = Math.cos(theta);
        const s = Math.sin(theta);
        const rx = c !== 0 ? Math.abs(halfW / c) : Infinity;
        const ry = s !== 0 ? Math.abs(halfH / s) : Infinity;
        return Math.min(rx, ry);
    }

    // Numerically finds the (numSectors + 1) boundary angles, starting at startAngle,
    // such that each of the numSectors consecutive slices sweeps equal AREA against the
    // rectangle boundary above (the standard polar sector-area integral (1/2)*r(theta)^2).
    function equalAreaBoundaries(halfW, halfH, startAngle, numSectors) {
        const dTheta = (2 * Math.PI) / SAMPLES;
        const cumulative = new Array(SAMPLES + 1);
        const angles = new Array(SAMPLES + 1);
        cumulative[0] = 0;
        angles[0] = startAngle;
        let prevR = rectBoundaryRadius(halfW, halfH, startAngle);
        for (let i = 1; i <= SAMPLES; i++) {
            const theta = startAngle + i * dTheta;
            const r = rectBoundaryRadius(halfW, halfH, theta);
            // Trapezoidal approximation of the (1/2) r^2 dTheta sector-area integral.
            cumulative[i] = cumulative[i - 1] + 0.5 * (0.5 * prevR * prevR + 0.5 * r * r) * dTheta;
            angles[i] = theta;
            prevR = r;
        }
        const total = cumulative[SAMPLES];

        const boundaries = [];
        for (let k = 0; k <= numSectors; k++) {
            const target = (k / numSectors) * total;
            let lo = 0, hi = SAMPLES;
            while (lo < hi) {
                const mid = (lo + hi) >> 1;
                if (cumulative[mid] < target) lo = mid + 1; else hi = mid;
            }
            if (lo === 0) {
                boundaries.push(angles[0]);
            } else {
                const a0 = cumulative[lo - 1], a1 = cumulative[lo];
                const t0 = angles[lo - 1], t1 = angles[lo];
                const frac = a1 > a0 ? (target - a0) / (a1 - a0) : 0;
                boundaries.push(t0 + frac * (t1 - t0));
            }
        }
        return boundaries; // length numSectors + 1; boundaries[numSectors] === startAngle + 2*PI
    }

    // The polygon tracing a sector's own slice of the rectangle: the center, the point
    // where the b0 ray meets the rectangle edge, any rectangle CORNERS the sector spans
    // (needed so the polygon follows the rectangle's actual perimeter instead of cutting
    // straight across it), and the point where the b1 ray meets the edge.
    function sectorPolygonPoints(cx, cy, halfW, halfH, b0, b1) {
        const pointAt = (theta) => {
            const r = rectBoundaryRadius(halfW, halfH, theta);
            return [cx + r * Math.cos(theta), cy + r * Math.sin(theta)];
        };
        const c1 = Math.atan2(halfH, halfW); // bottom-right corner's angle (0 < c1 < PI/2)
        const cornerAngles = [c1, Math.PI - c1, Math.PI + c1, 2 * Math.PI - c1];

        const pts = [[cx, cy], pointAt(b0)];
        for (const ca of cornerAngles) {
            if (ca > b0 && ca < b1) pts.push(pointAt(ca));
        }
        pts.push(pointAt(b1));
        return pts;
    }

    function updateImageLayers(cx, cy, halfW, halfH, boundaries) {
        SECTIONS.forEach((section, i) => {
            const img = document.querySelector(`.pie-image[data-section="${section}"]`);
            if (!img) return;
            const pts = sectorPolygonPoints(cx, cy, halfW, halfH, boundaries[i], boundaries[i + 1]);

            // Size/position the element to just this sector's own bounding box (the max
            // spread of its polygon's x's and y's), not the full viewport - otherwise
            // "background-size: cover" scales the image to cover the whole screen even
            // though only this small clipped sliver of it is ever visible, zooming in far
            // more than necessary.
            const xs = pts.map((p) => p[0]);
            const ys = pts.map((p) => p[1]);
            const minX = Math.min(...xs), maxX = Math.max(...xs);
            const minY = Math.min(...ys), maxY = Math.max(...ys);

            img.style.left = `${minX}px`;
            img.style.top = `${minY}px`;
            img.style.width = `${maxX - minX}px`;
            img.style.height = `${maxY - minY}px`;

            // clip-path is relative to the element's OWN box, so translate each point
            // from full-viewport coordinates into this smaller box's local coordinates.
            const poly = pts
                .map(([x, y]) => `${(x - minX).toFixed(1)}px ${(y - minY).toFixed(1)}px`)
                .join(", ");
            img.style.clipPath = `polygon(${poly})`;
        });
    }

    function updatePie() {
        const wrap = document.querySelector(".pie-wrap");
        if (!wrap) return;

        const w = wrap.clientWidth;
        const h = wrap.clientHeight;
        if (!w || !h) return;

        const cx = w / 2;
        const cy = h / 2;
        const halfW = w / 2;
        const halfH = h / 2;
        const startAngle = 0; // 3-o'clock, matches the previous design's starting point

        const boundaries = equalAreaBoundaries(halfW, halfH, startAngle, SECTIONS.length);
        updateImageLayers(cx, cy, halfW, halfH, boundaries);

        SECTIONS.forEach((section, i) => {
            const b0 = boundaries[i];
            const b1 = boundaries[i + 1];
            const midAngle = (b0 + b1) / 2;
            const maxR = rectBoundaryRadius(halfW, halfH, midAngle);
            const t = 0.55;
            const x = cx + t * maxR * Math.cos(midAngle);
            const y = cy + t * maxR * Math.sin(midAngle);

            const label = document.querySelector(`.pie-label[data-section="${section}"]`);
            if (label) {
                label.style.left = `${x}px`;
                label.style.top = `${y}px`;
            }
        });
    }

    updatePie();
    window.addEventListener("resize", debounce(updatePie, 120));
})();
