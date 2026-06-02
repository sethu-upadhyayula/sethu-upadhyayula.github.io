document.addEventListener('DOMContentLoaded', () => {

    // ── Theme toggle ──

    const desktopToggle = document.getElementById("desktop-theme-toggle");
    const mobileToggle  = document.getElementById("mobile-theme-toggle");
    const html          = document.documentElement;

    const setTheme = (theme) => {
        html.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
        if (desktopToggle) desktopToggle.checked = (theme === "light");
        if (mobileToggle) {
            mobileToggle.querySelector("i").className =
                (theme === "light") ? "fas fa-sun" : "fas fa-moon";
        }
    };

    setTheme(localStorage.getItem("theme") || "dark");

    if (desktopToggle) {
        desktopToggle.addEventListener("change", () =>
            setTheme(desktopToggle.checked ? "light" : "dark")
        );
    }
    if (mobileToggle) {
        mobileToggle.addEventListener("click", () =>
            setTheme(html.getAttribute("data-theme") === "dark" ? "light" : "dark")
        );
    }

    // ── Active nav link ──

    const currentPath = window.location.pathname;
    document.querySelectorAll(".nav-link").forEach(link => {
        const linkPath = new URL(link.href).pathname;
        if (currentPath === linkPath ||
            (currentPath === "/" && linkPath === "/index.html")) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });

    // ── TOC accordion ──

    const tocNav = document.getElementById("math-toc-nav");
    if (!tocNav) return;

    const chapters = tocNav.querySelectorAll(".toc-chapter");

    chapters.forEach(chapter => {
        const slug   = chapter.dataset.chapter;
        const btn    = chapter.querySelector(".toc-toggle-btn");
        const subs   = chapter.querySelector(".toc-subsections");

        // Highlight active subsection link
        if (subs) {
            subs.querySelectorAll("a").forEach(a => {
                if (currentPath.endsWith(new URL(a.href).pathname) ||
                    currentPath === new URL(a.href).pathname) {
                    a.classList.add("toc-active");
                }
            });
        }

        // Auto-expand the chapter whose slug appears in the current URL
        if (slug && currentPath.includes(slug)) {
            chapter.classList.add("open");
        }

        // Toggle on button click
        if (btn) {
            btn.addEventListener("click", () => {
                chapter.classList.toggle("open");
            });
        }
    });

    // Highlight active chapter-level link
    tocNav.querySelectorAll(".toc-chapter-link").forEach(a => {
        try {
            if (currentPath === new URL(a.href).pathname) {
                a.classList.add("toc-active");
            }
        } catch (_) {}
    });

    // Scroll active item into view inside the TOC
    const toc = document.getElementById("math-toc");
    if (toc) {
        const active = toc.querySelector(".toc-active");
        if (active) {
            active.scrollIntoView({ block: "center", behavior: "instant" });
        }
    }

});
