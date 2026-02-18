// ===============================
// SELECTORS
// ===============================
const gallery = document.querySelector("#gallery");
const favContainer = document.querySelector("#favorites");

const modal = document.querySelector("#modal");
const modalImg = document.querySelector("#modalImg");
const modalTitle = document.querySelector("#modalTitle");
const modalDesc = document.querySelector("#modalDesc");
const closeModal = document.querySelector("#closeModal");
const favBtn = document.querySelector("#favBtn");

let currentPhoto = null;
let allPhotos = [];

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

async function loadPhotos() {
    try {
        const response = await fetch("./data/photos.json");

        if (!response.ok) {
            throw new Error("JSON not found");
        }

        const photos = await response.json();
        allPhotos = photos;

        displayPhotos(photos);
        displayFavorites(photos);

    } catch (error) {
        console.error("Error loading photos:", error);
        gallery.innerHTML = "<p>Failed to load photos.</p>";
    }
}

function displayPhotos(photos) {
    gallery.innerHTML = "";

    photos.forEach(photo => {
        const img = document.createElement("img");
        img.src = photo.image;
        img.alt = photo.title;
        img.loading = "lazy";

        img.addEventListener("click", () => openModal(photo));
        gallery.appendChild(img);
    });
}

function displayFavorites(photos) {
    if (!favContainer) return;

    favContainer.innerHTML = "";

    const favPhotos = photos.filter(photo =>
        favorites.includes(photo.id)
    );

    if (favPhotos.length === 0) {
        favContainer.innerHTML = "<p>No favorites yet ❤️</p>";
        return;
    }

    favPhotos.forEach(photo => {
        const img = document.createElement("img");
        img.src = photo.image;
        img.alt = photo.title;

        img.addEventListener("click", () => openModal(photo));
        favContainer.appendChild(img);
    });
}

function openModal(photo) {
    currentPhoto = photo;

    modal.classList.remove("hidden");

    modalImg.src = photo.image;
    modalTitle.textContent = photo.title;
    modalDesc.textContent = photo.description;

    updateFavButton();
}

closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.add("hidden");
    }
});

favBtn.addEventListener("click", () => {
    if (!currentPhoto) return;

    const exists = favorites.includes(currentPhoto.id);

    if (exists) {
        favorites = favorites.filter(id => id !== currentPhoto.id);
    } else {
        favorites.push(currentPhoto.id);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));

    updateFavButton();

    displayFavorites(allPhotos);
});

function updateFavButton() {
    const isFav = favorites.includes(currentPhoto.id);
    favBtn.textContent = isFav
        ? "💔 Remove Favorite"
        : "❤️ Add Favorite";
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modal.classList.add("hidden");
  }
});

loadPhotos();
