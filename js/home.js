
document.querySelectorAll("[data-link]").forEach(item => {

    item.addEventListener("click", (e) => {

        e.stopPropagation();

        const link = item.getAttribute("data-link");

        if (!link) return;

        window.location.href = link;

    });

});

const dashboard = document.getElementById("nav-dashboard");

if (dashboard) {

    dashboard.addEventListener("click", () => {
        window.location.href = "index.html";
    });

}

document.querySelectorAll(".menu-header").forEach(header => {

    header.addEventListener("click", () => {

        const parent = header.parentElement;
        parent.classList.toggle("open");

        const submenu = parent.querySelector(".submenu");

        if (!submenu) return;

        submenu.style.display =
            submenu.style.display === "block" ? "none" : "block";

    });

});