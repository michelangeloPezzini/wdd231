// ================================
// THANK YOU PAGE RESULTS SCRIPT
// ================================

const params = new URLSearchParams(window.location.search);

const results = document.getElementById("results");

// Membership plan names (pretty output)
const membershipNames = {
  np: "NP Membership (Free)",
  bronze: "Bronze Membership",
  silver: "Silver Membership",
  gold: "Gold Membership",
};

// Get membership value
const chosenPlan = params.get("membership");

// Get timestamp value
const timestamp = params.get("timestamp");

// Convert timestamp to readable date
const formattedDate = timestamp
  ? new Date(timestamp).toLocaleString()
  : "Not available";

// Display required fields
results.innerHTML = `
  <li><strong>First Name:</strong> ${params.get("fname")}</li>
  <li><strong>Last Name:</strong> ${params.get("lname")}</li>
  <li><strong>Email:</strong> ${params.get("email")}</li>
  <li><strong>Mobile Phone:</strong> ${params.get("phone")}</li>
  <li><strong>Business Name:</strong> ${params.get("business")}</li>

  <li><strong>Membership Plan:</strong> ${
    membershipNames[chosenPlan] || "Not selected"
  }</li>

  <li><strong>Date Submitted:</strong> ${formattedDate}</li>
`;
