document.addEventListener('DOMContentLoaded', () => {
    const desktopToggle = document.getElementById("desktop-theme-toggle");
    const mobileToggle = document.getElementById("mobile-theme-toggle");
    const htmlElement = document.documentElement;

    const setTheme = (theme) => {
        htmlElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
        
        if (desktopToggle) {
            desktopToggle.checked = (theme === "light");
        }
        
        if (mobileToggle) {
            const icon = mobileToggle.querySelector("i");
            icon.className = (theme === "light") ? "fas fa-sun" : "fas fa-moon";
        }
    };

    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);

    if (desktopToggle) {
        desktopToggle.addEventListener("change", () => {
            setTheme(desktopToggle.checked ? "light" : "dark");
        });
    }

    if (mobileToggle) {
        mobileToggle.addEventListener("click", () => {
            const current = htmlElement.getAttribute("data-theme");
            setTheme(current === "dark" ? "light" : "dark");
        });
    }

    const currentPath = window.location.pathname;
    document.querySelectorAll(".nav-link").forEach(link => {
        const linkPath = new URL(link.href).pathname;
        if (currentPath === linkPath || (currentPath === "/" && linkPath === "/index.html")) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
});