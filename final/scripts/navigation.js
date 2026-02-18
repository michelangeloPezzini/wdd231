const menuBtn = document.querySelector("#menu");
const navMenu = document.querySelector("#navMenu");

menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("show");
});
