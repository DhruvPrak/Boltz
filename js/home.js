/* ===============================
MAIN SIDEBAR NAVIGATION
================================ */

document.getElementById("nav-dashboard")?.addEventListener("click", () => {
window.location.href = "index.html";
});

document.getElementById("nav-arrays")?.addEventListener("click", () => {
window.location.href = "pages/array.html";
});

document.getElementById("nav-stack")?.addEventListener("click", () => {
window.location.href = "pages/stack.html";
});

document.getElementById("nav-trees")?.addEventListener("click", () => {
alert("Trees page coming soon 🚧");
});

document.getElementById("nav-graphs")?.addEventListener("click", () => {
alert("Graphs page coming soon 🚧");
});

/* ===============================
ACCORDION TOGGLE
================================ */

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

/* ===============================
SUBMENU PAGE NAVIGATION
================================ */

document.querySelectorAll(".submenu-item").forEach(item => {

item.addEventListener("click", (e) => {

e.stopPropagation();

const link = item.getAttribute("data-link");

if (link) {
window.location.href = link;
}

});

});