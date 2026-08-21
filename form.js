// form.js — Alysia Lewis Personal Portfolio
// IT-FPX3240 Web Development and JavaScript
// Assessment 8: JavaScript Form Data Reading and Display

// --- Get references to form input elements ---
// Using getElementById() to access each named field
const fullNameInput    = document.getElementById("fullName");
const emailInput       = document.getElementById("email");
const phoneInput       = document.getElementById("phone");
const organizationInput= document.getElementById("organization");
const contactMethodSel = document.getElementById("contactMethod");
const messageInput     = document.getElementById("message");

// Output area where formatted results will be displayed below the form
const formOutput = document.getElementById("form-output");

// --- Function: displayFormData ---
// Reads all form inputs and displays them in formatted output on the page.
// Triggered when the user clicks the Submit button.
function displayFormData(event) {

  // Prevent the default form submission (page reload)
  event.preventDefault();

  // Log that the function was triggered
  console.log("displayFormData() triggered by form submit event.");

  // --- Read text field values using getElementById() ---
  let name         = fullNameInput.value.trim();
  let email        = emailInput.value.trim();
  let phone        = phoneInput.value.trim() || "Not provided";
  let organization = organizationInput.value.trim() || "Not provided";
  let message      = messageInput.value.trim();

  // --- Read selected contact method from <select> ---
  let contactMethod = contactMethodSel.value || "Not selected";

  // Log the text field values to the console
  console.log("Name: " + name + " | Email: " + email + " | Phone: " + phone);

  // --- Read radio button selection using getElementsByName() ---
  let reasonInputs = document.getElementsByName("reason");
  let selectedReason = "Not selected";
  for (let i = 0; i < reasonInputs.length; i++) {
    if (reasonInputs[i].checked) {
      selectedReason = reasonInputs[i].value;
      break; // Stop once the checked radio is found
    }
  }
  console.log("Selected reason: " + selectedReason);

  // --- Read checkbox selections using getElementsByName() ---
  let interestInputs = document.getElementsByName("interests");
  let selectedInterests = [];
  for (let i = 0; i < interestInputs.length; i++) {
    if (interestInputs[i].checked) {
      selectedInterests.push(interestInputs[i].value);
    }
  }
  let interestsDisplay = selectedInterests.length > 0
    ? selectedInterests.join(", ")
    : "None selected";
  console.log("Selected interests: " + interestsDisplay);

  // --- Build formatted HTML output string ---
  let outputHTML = "<h3>$ Submission Summary</h3>";
  outputHTML += "<ul>";
  outputHTML += "<li><strong>Name:</strong> "             + name             + "</li>";
  outputHTML += "<li><strong>Email:</strong> "            + email            + "</li>";
  outputHTML += "<li><strong>Phone:</strong> "            + phone            + "</li>";
  outputHTML += "<li><strong>Organization:</strong> "     + organization     + "</li>";
  outputHTML += "<li><strong>Reason:</strong> "           + selectedReason   + "</li>";
  outputHTML += "<li><strong>Interests:</strong> "        + interestsDisplay + "</li>";
  outputHTML += "<li><strong>Contact Method:</strong> "   + contactMethod    + "</li>";
  outputHTML += "<li><strong>Message:</strong> "          + message          + "</li>";
  outputHTML += "</ul>";

  // Insert the formatted output into the output div
  formOutput.innerHTML = outputHTML;

  console.log("Form data displayed successfully in #form-output.");
}

// --- Event Handler ---
// Attach displayFormData to the form's submit event.
// Note: validation.js also listens to submit; both run in order.
const webForm = document.getElementById("webForm");
if (webForm) {
  webForm.addEventListener("submit", displayFormData);
};
