/* ===============================
   MAIN SIDEBAR NAVIGATION (TOP LEVEL)
================================ */

// Dashboard
document.getElementById("nav-dashboard")?.addEventListener("click", () => {
  window.location.href = "/index.html";
});

// Arrays
document.getElementById("nav-arrays")?.addEventListener("click", () => {
  window.location.href = "/pages/array.html";
});

// Stack
document.getElementById("nav-stack")?.addEventListener("click", () => {
  window.location.href = "/pages/stack.html";
});

// Trees (coming soon)
document.getElementById("nav-trees")?.addEventListener("click", () => {
  alert("Trees page coming soon 🚧");
});

// Graphs (coming soon)
document.getElementById("nav-graphs")?.addEventListener("click", () => {
  alert("Graphs page coming soon 🚧");
});


/* ===============================
   ACCORDION TOGGLE (QUEUE, LINKED LIST)
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
    e.stopPropagation(); // prevent accordion toggle

    const link = item.getAttribute("data-link");
    if (link) {
      window.location.href = "/" + link;
    }
  });
});


/* ===============================
   LINKED LIST SUBITEM PLACEHOLDERS
================================ */

document.querySelectorAll(".submenu-group .submenu-item").forEach(item => {
  item.addEventListener("click", (e) => {
    e.stopPropagation();

    alert("This Linked List operation page will be added soon 🚧");
  });
});
