// ================= Navigation Menu =================

// Select elements
const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

// Toggle navigation menu
menuButton.addEventListener("click", () => {
    navLinks.classList.toggle("open");

    // Accessibility: update aria-expanded
    const isOpen = navLinks.classList.contains("open");
    menuButton.setAttribute("aria-expanded", isOpen);
});