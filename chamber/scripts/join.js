// ================================
// JOIN PAGE MODALS SCRIPT
// ================================

document.querySelectorAll(".card a").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const modalId = link.getAttribute("href").replace("#", "");
    document.getElementById(modalId).showModal();
  });
});

// ================================
// TIMESTAMP FIELD AUTO-FILL
// ================================

const timestampField = document.getElementById("timestamp");

if (timestampField) {
  timestampField.value = new Date().toISOString();
}
