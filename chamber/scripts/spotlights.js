const spotlightContainer = document.querySelector("#spotlight-cards");
const membersUrl = "data/members.json";

async function getSpotlights() {
  try {
    const response = await fetch(membersUrl);

    if (!response.ok) {
      throw Error(await response.text());
    }

    const data = await response.json();

    console.log("Members loaded:", data);

    const qualified = data.filter(
      member => member.membership === 2 || member.membership === 3
    );

    const shuffled = qualified.sort(() => 0.5 - Math.random());

    const chosen = shuffled.slice(0, Math.floor(Math.random() * 2) + 2);

    displaySpotlights(chosen);

  } catch (error) {
    console.log("Spotlight Error:", error);
  }
}

function displaySpotlights(members) {
  members.forEach(member => {
    const card = document.createElement("div");
    card.classList.add("spotlight-card");

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo">
      <h3>${member.name}</h3>
      <p><strong>Membership:</strong> ${
        member.membership === 3 ? "Gold" : "Silver"
      }</p>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
    `;

    spotlightContainer.appendChild(card);
  });
}

getSpotlights();
