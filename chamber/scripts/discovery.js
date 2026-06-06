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

        const cardInner = document.createElement("div");
        cardInner.classList.add("card-inner");

        // FRONT
        const cardFront = document.createElement("div");
        cardFront.classList.add("card-front");

        const figure = document.createElement("figure");
        const img = document.createElement("img");
        img.src = item.image;
        img.alt = item.name;
        img.loading = "lazy";
        figure.appendChild(img);

        const title = document.createElement("h2");
        title.textContent = item.nickname;

        cardFront.appendChild(figure);
        cardFront.appendChild(title);

        // BACK
        const cardBack = document.createElement("div");
        cardBack.classList.add("card-back");

        const fullName = document.createElement("h3");
        fullName.textContent = item.name;

        const description = document.createElement("p");
        description.textContent = item.description;

        const address = document.createElement("address");
        address.textContent = item.address;

        const button = document.createElement("button");
        button.textContent = "Learn More";

        cardBack.append(fullName, description, address, button);

        // APPEND TO INNER
        cardInner.append(cardFront, cardBack);
        card.appendChild(cardInner);

        gallery.appendChild(card);
        });
  }

  /* =========================
     VISIT MESSAGE
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