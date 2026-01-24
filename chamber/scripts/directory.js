const membersContainer = document.querySelector('#members');
const gridButton = document.querySelector('#grid');
const listButton = document.querySelector('#list');

async function getMembers() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) {
      throw new Error('Failed to fetch members data');
    }
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error(error);
  }
}

function displayMembers(members) {
  membersContainer.innerHTML = '';

  members.forEach(member => {
    const card = document.createElement('section');

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
      <h2>${member.name}</h2>
      <p>${member.description}</p>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>Membership Level:</strong> ${getMembershipLevel(member.membership)}</p>
      <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
    `;

    membersContainer.appendChild(card);
  });
}

function getMembershipLevel(level) {
  switch (level) {
    case 1:
      return 'Member';
    case 2:
      return 'Silver';
    case 3:
      return 'Gold';
    default:
      return 'Member';
  }
}

gridButton.addEventListener('click', () => {
  membersContainer.classList.add('grid');
  membersContainer.classList.remove('list');
});

listButton.addEventListener('click', () => {
  membersContainer.classList.add('list');
  membersContainer.classList.remove('grid');
});

getMembers();
