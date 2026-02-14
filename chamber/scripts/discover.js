import { discoverItems } from "../data/discover.mjs";

const grid = document.querySelector("#discover-grid");
const messageBox = document.querySelector("#visit-message");


discoverItems.forEach((item, index) => {
  const card = document.createElement("section");
  card.classList.add("card", `card${index + 1}`);

  card.innerHTML = `
    <h2>${item.name}</h2>
    <figure>
      <img src="${item.image}" alt="${item.name}">
    </figure>
    <address>${item.address}</address>
    <p>${item.description}</p>
    <button>Learn More</button>
  `;

  grid.appendChild(card);
});

const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (!lastVisit) {
  messageBox.textContent = "Welcome! Let us know if you have any questions.";
} else {
  const diffTime = now - Number(lastVisit);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 1) {
    messageBox.textContent = "Back so soon! Awesome!";
  } else if (diffDays === 1) {
    messageBox.textContent = "You last visited 1 day ago.";
  } else {
    messageBox.textContent = `You last visited ${diffDays} days ago.`;
  }
}

localStorage.setItem("lastVisit", now);
