import { discoverItems } from "../data/discovery.mjs";

/* =========================
   DOM READY
   ========================= */
document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     DISCOVER CARDS
     ========================= */
  const gallery = document.querySelector(".gallery");

  if (gallery) {
    discoverItems.forEach(item => {

      const card = document.createElement("section");
      card.classList.add("discover-card");

      const title = document.createElement("h2");
      title.textContent = item.name;

      const figure = document.createElement("figure");

      const img = document.createElement("img");
      img.src = item.image;
      img.alt = item.name;
      img.loading = "lazy";
      img.width = 300;
      img.height = 200;

      figure.appendChild(img);

      const address = document.createElement("address");
      address.textContent = item.address;

      const description = document.createElement("p");
      description.textContent = item.description;

      const button = document.createElement("button");
      button.textContent = "Learn More";
      button.type = "button";

      card.append(title, figure, address, description, button);
      gallery.appendChild(card);
    });
  }

  /* =========================
     ACTIVITY 11 – VISIT MESSAGE
     ========================= */
  const visitToast = document.getElementById("visitToast");

  if (visitToast) {
    const MS_PER_DAY = 1000 * 60 * 60 * 24;
    const now = Date.now();
    const lastVisit = localStorage.getItem("lastVisit");

    let message = "";

    if (!lastVisit) {
      message = "Welcome! Let us know if you have any questions.";
    } else {
      const daysBetween = Math.floor((now - lastVisit) / MS_PER_DAY);

      if (daysBetween < 1) {
        message = "Back so soon! Awesome!";
      } else if (daysBetween === 1) {
        message = "You last visited 1 day ago.";
      } else {
        message = `You last visited ${daysBetween} days ago.`;
      }
    }

    visitToast.textContent = message;
    visitToast.classList.add("show");

    localStorage.setItem("lastVisit", now);
  }

});