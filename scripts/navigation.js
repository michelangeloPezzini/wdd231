const menuButton = document.querySelector("#menu");
const nav = document.querySelector("#navMenu");

menuButton.addEventListener("click", () => {
    nav.classList.toggle("show");
});
