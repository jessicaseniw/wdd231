import { discoverItems } from "../data/discovery.mjs";

const gallery = document.querySelector(".gallery");

discoverItems.forEach(item => {
  // Card container
  const card = document.createElement("section");
  card.classList.add("discover-card");

  // Title
  const title = document.createElement("h2");
  title.textContent = item.name;

  // Figure + Image
  const figure = document.createElement("figure");

  const img = document.createElement("img");
  img.src = item.image;
  img.alt = item.name;
  img.loading = "lazy";
  img.width = 300;
  img.height = 200;

  figure.appendChild(img);

  // Address
  const address = document.createElement("address");
  address.textContent = item.address;

  // Description
  const description = document.createElement("p");
  description.textContent = item.description;

  // Button
  const button = document.createElement("button");
  button.textContent = "Learn More";
  button.type = "button";

  // Assemble card
  card.append(title, figure, address, description, button);
  gallery.appendChild(card);
});