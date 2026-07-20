document.addEventListener('DOMContentLoaded', () => {

    // ── Theme toggle (single floating FAB, used at all breakpoints) ──

    const mobileToggle = document.getElementById("mobile-theme-toggle");
    const html         = document.documentElement;

    const setTheme = (theme) => {
        html.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
        if (mobileToggle) {
            mobileToggle.querySelector("i").className =
                (theme === "light") ? "fas fa-sun" : "fas fa-moon";
        }
    };

    setTheme(localStorage.getItem("theme") || "light");

    if (mobileToggle) {
        mobileToggle.addEventListener("click", () =>
            setTheme(html.getAttribute("data-theme") === "dark" ? "light" : "dark")
        );
    }

    // ── Nav dock (floating cross-section menu) ──

    const navDock       = document.getElementById("nav-dock");
    const navDockToggle = document.getElementById("nav-dock-toggle");

    if (navDock && navDockToggle) {
        navDockToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            const isOpen = navDock.classList.toggle("open");
            navDockToggle.setAttribute("aria-expanded", String(isOpen));
        });
        document.addEventListener("click", (e) => {
            if (!navDock.contains(e.target)) {
                navDock.classList.remove("open");
                navDockToggle.setAttribute("aria-expanded", "false");
            }
        });
    }

    // ── Active cross-link dot (accessibility hint; visual state is CSS-only via [data-section]) ──

    const currentPath = window.location.pathname;
    const activeSection = html.dataset.section;
    if (activeSection) {
        const activeDot = document.querySelector(`.crosslink-dot[data-crosslink="${activeSection}"]`);
        if (activeDot) activeDot.setAttribute("aria-current", "page");
    }

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
