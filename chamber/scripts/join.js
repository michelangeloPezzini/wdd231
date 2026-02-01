
document.querySelectorAll(".card a").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const modalId = link.getAttribute("href").replace("#", "");
    document.getElementById(modalId).showModal();
  });
});



const timestampField = document.getElementById("timestamp");

if (timestampField) {
  timestampField.value = new Date().toISOString();
}


document.querySelectorAll(".close-modal").forEach((button) => {
  button.addEventListener("click", () => {
    button.closest("dialog").close();
  });
});

document.querySelectorAll("dialog").forEach((dialog) => {
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
  });
});
