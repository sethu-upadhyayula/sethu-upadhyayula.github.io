// Real mouse-driven parallax for the scattered background symbols: each one
// drifts a little relative to the cursor, at its own depth, so the whole
// field reads as layered rather than static. Falls back to nothing on touch
// devices (no mousemove events fire there, which is fine).

(function () {
    const doodles = document.querySelectorAll(".orbit-doodle");
    if (!doodles.length) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let ticking = false;

    function onMouseMove(e) {
        targetX = e.clientX / window.innerWidth - 0.5;
        targetY = e.clientY / window.innerHeight - 0.5;
        if (!ticking) {
            requestAnimationFrame(render);
            ticking = true;
        }
    }

    function render() {
        // Ease toward the target so the motion feels fluid, not jumpy.
        currentX += (targetX - currentX) * 0.08;
        currentY += (targetY - currentY) * 0.08;

        doodles.forEach((el) => {
            const depth = parseFloat(el.dataset.depth || "1");
            const dx = currentX * depth * 26;
            const dy = currentY * depth * 26;
            el.style.transform = `translate(${dx}px, ${dy}px)`;
        });

        if (Math.abs(targetX - currentX) > 0.001 || Math.abs(targetY - currentY) > 0.001) {
            requestAnimationFrame(render);
        } else {
            ticking = false;
        }
    }

    window.addEventListener("mousemove", onMouseMove);
})();
