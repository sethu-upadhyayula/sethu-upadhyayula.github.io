// Homepage pie geometry: outer boundary is elliptical (matches the viewport's
// width/height), inner boundary (around the center "S") stays a true circle.
// Recomputed on load and on resize since it depends on live viewport dimensions.
// Wedge icons are plain HTML links positioned in pie-wrap's own pixel box
// (not inside the SVG), so they render as crisp Font Awesome glyphs.

(function () {
    // Order determines wedge placement (each gets a consecutive 60deg PARAMETRIC slice
    // starting at 0deg/3-o'clock, going clockwise). This specific order puts Math/Quant/
    // Chess across the top half and Bio/Dev/Music across the bottom half, each reading
    // left-to-right.
    const SECTIONS = ["music", "dev", "bio", "math", "quant", "chess"];

    // Points per 60deg wedge along the outer curve. The outer boundary is drawn as a
    // sampled polyline (not a single SVG elliptical-arc command) — see note below.
    const ARC_SEGMENTS_PER_WEDGE = 24;

    function debounce(fn, wait) {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), wait);
        };
    }

    // Circle case (rx === ry): a point at parametric angle == its true angle from center.
    function point(cx, cy, rx, ry, angleRad) {
        return [cx + rx * Math.cos(angleRad), cy + ry * Math.sin(angleRad)];
    }

    // The ellipse boundary point lying on the ray at a given TRUE angle from center (i.e.
    // the angle you'd actually measure/hover at) — NOT the same as point() above, which
    // takes a *parametric* angle. The two only coincide when rx === ry (a circle); for an
    // elliptical outer boundary they diverge, so using point() with a true angle (as the
    // icon-centering code used to) lands off the actual boundary in that direction.
    function pointAtTrueAngle(cx, cy, rx, ry, trueAngleRad) {
        const cosA = Math.cos(trueAngleRad);
        const sinA = Math.sin(trueAngleRad);
        const r = (rx * ry) / Math.sqrt((ry * cosA) ** 2 + (rx * sinA) ** 2);
        return [cx + r * cosA, cy + r * sinA];
    }

    function updatePie() {
        const wrap = document.querySelector(".pie-wrap");
        const svg = document.querySelector(".pie-chart");
        if (!wrap || !svg) return;

        const w = wrap.clientWidth;
        const h = wrap.clientHeight;
        if (!w || !h) return;

        const cx = w / 2;
        const cy = h / 2;
        const Rx = (w / 2) * 0.98;
        const Ry = (h / 2) * 0.98;
        const rInner = Math.min(w, h) * 0.075;
        const iconPx = Math.min(Rx, Ry) * 0.34;

        svg.setAttribute("viewBox", `0 0 ${w} ${h}`);

        // For an ellipse, equal-AREA sectors come from equal steps of the *parametric*
        // angle t in (Rx*cos(t), Ry*sin(t)) — the classical "eccentric anomaly" property:
        // the area swept from t=0 to t=T is exactly (1/2)*Rx*Ry*T regardless of Rx/Ry, so
        // uniform 60deg steps in t give exactly equal-area outer sectors.
        //
        // The outer boundary between two such points is drawn as a SAMPLED POLYLINE, not
        // a single SVG "A" (elliptical-arc) command. That's deliberate: given just two
        // endpoints + radii, an "A" command is geometrically ambiguous — two different
        // ellipses (with the same radii) can pass through the same two points, bulging in
        // opposite directions, and for some wedges here the browser picked the wrong one
        // (bulging inward instead of outward), silently shrinking that wedge by several
        // percent. Sampling points directly off our own parametric formula removes that
        // ambiguity entirely.
        //
        // A point's *parametric* angle t is generally NOT its *true* angle (the angle of
        // the ray from center to that point) unless Rx===Ry. The wedge's straight edge
        // needs its inner and outer endpoints on the SAME true-angle ray through the
        // center (otherwise scaling the wedge from the center for the hover-grow effect
        // shifts that edge sideways into the neighbor) — so the inner point is placed at
        // the outer point's true angle, not at the same parametric angle.
        function trueAngleOf(p) {
            return Math.atan2(p[1] - cy, p[0] - cx);
        }

        const totalSegments = SECTIONS.length * ARC_SEGMENTS_PER_WEDGE;
        const outerPts = [];
        for (let k = 0; k <= totalSegments; k++) {
            const t = (k / totalSegments) * 2 * Math.PI;
            outerPts.push(point(cx, cy, Rx, Ry, t));
        }

        SECTIONS.forEach((section, i) => {
            const startIdx = i * ARC_SEGMENTS_PER_WEDGE;
            const endIdx = startIdx + ARC_SEGMENTS_PER_WEDGE;
            const wedgeOuterPts = outerPts.slice(startIdx, endIdx + 1);

            const b0outer = wedgeOuterPts[0];
            const b1outer = wedgeOuterPts[wedgeOuterPts.length - 1];
            const b0trueAngle = trueAngleOf(b0outer);
            const b1trueAngle = trueAngleOf(b1outer);
            const b0inner = point(cx, cy, rInner, rInner, b0trueAngle);
            const b1inner = point(cx, cy, rInner, rInner, b1trueAngle);

            const outerLine = wedgeOuterPts
                .slice(1)
                .map(([x, y]) => `L${x},${y}`)
                .join(" ");

            const d =
                `M${b0outer[0]},${b0outer[1]} ${outerLine} ` +
                `L${b1inner[0]},${b1inner[1]} A${rInner},${rInner} 0 0 0 ${b0inner[0]},${b0inner[1]} Z`;

            const wedge = document.querySelector(`.pie-wedge[data-section="${section}"]`);
            if (wedge) wedge.setAttribute("d", d);

            // Icon centered in the wedge's "meat", along the true-angle bisector of its
            // two boundary rays so it stays visually centered regardless of sector width.
            // atan2 wraps at +/-180deg, so the wedge that straddles that boundary needs
            // its end angle unwrapped before averaging (otherwise the naive average lands
            // on the opposite side of the pie).
            let b1trueAngleUnwrapped = b1trueAngle;
            if (b1trueAngleUnwrapped < b0trueAngle) b1trueAngleUnwrapped += 2 * Math.PI;
            const midAngle = (b0trueAngle + b1trueAngleUnwrapped) / 2;
            const t = 0.62;
            const [outerX, outerY] = pointAtTrueAngle(cx, cy, Rx, Ry, midAngle);
            const [innerX, innerY] = point(cx, cy, rInner, rInner, midAngle);
            const ipx = innerX + t * (outerX - innerX);
            const ipy = innerY + t * (outerY - innerY);

            const iconLink = document.querySelector(`.wedge-icon-link[data-section="${section}"]`);
            if (iconLink) {
                iconLink.style.left = `${ipx}px`;
                iconLink.style.top = `${ipy}px`;
                iconLink.style.fontSize = `${iconPx}px`;
            }
        });
    }

    // The wedge's SVG path and its Font Awesome icon are separate elements (the icon is
    // a plain HTML link positioned over the SVG, not nested inside the wedge's own <a>),
    // so plain CSS :hover can't make them react together. Sync a shared "wedge-hovered"
    // class between the two instead, wired once (element identities don't change on
    // resize, only their geometry/position does).
    function wireWedgeIconHoverSync() {
        SECTIONS.forEach((section) => {
            const wedge = document.querySelector(`.pie-wedge[data-section="${section}"]`);
            const wedgeLink = wedge ? wedge.closest("a") : null;
            const iconLink = document.querySelector(`.wedge-icon-link[data-section="${section}"]`);
            if (!wedge || !wedgeLink || !iconLink) return;

            const setHovered = (on) => {
                wedge.classList.toggle("wedge-hovered", on);
                iconLink.classList.toggle("wedge-hovered", on);
            };

            wedgeLink.addEventListener("mouseenter", () => setHovered(true));
            wedgeLink.addEventListener("mouseleave", () => setHovered(false));
            iconLink.addEventListener("mouseenter", () => setHovered(true));
            iconLink.addEventListener("mouseleave", () => setHovered(false));
        });
    }

    updatePie();
    wireWedgeIconHoverSync();
    window.addEventListener("resize", debounce(updatePie, 120));
})();
