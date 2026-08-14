// validation.js
// ITFPX3240 Assessment 9 – HTML5 + JavaScript Form Validation

// Get reference to the form
const form = document.getElementById('webForm');

// Get references to input fields
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

// Get references to error message containers
const fullNameError = document.getElementById('fullNameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');
const formMessage = document.getElementById('formMessage');

// Validation function (triggered on form submit)
function validateForm(event) {
    // Prevent default submission so we can validate first
    event.preventDefault();

    let isValid = true;

    // Clear all previous error/success messages
    fullNameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';
    formMessage.textContent = '';
    formMessage.className = 'form-message';

    // === Full Name validation ===
    if (!fullNameInput.checkValidity()) {
        if (fullNameInput.validity.valueMissing) {
            fullNameError.textContent = 'Full name is required.';
        } else if (fullNameInput.validity.tooShort) {
            fullNameError.textContent = 'Full name must be at least 2 characters.';
        } else if (fullNameInput.validity.tooLong) {
            fullNameError.textContent = 'Full name must be 50 characters or less.';
        }
        isValid = false;
    }

    // === Email validation ===
    if (!emailInput.checkValidity()) {
        if (emailInput.validity.valueMissing) {
            emailError.textContent = 'Email address is required.';
        } else if (emailInput.validity.typeMismatch) {
            emailError.textContent = 'Please enter a valid email address.';
        }
        isValid = false;
    }

    // === Message validation ===
    if (!messageInput.checkValidity()) {
        if (messageInput.validity.valueMissing) {
            messageError.textContent = 'Message is required.';
        } else if (messageInput.validity.tooShort) {
            messageError.textContent = 'Message must be at least 10 characters.';
        }
        isValid = false;
    }

    // === Overall result ===
    if (isValid) {
        formMessage.textContent = 'Form is valid! Submitting...';
        formMessage.classList.add('success');
        
        // Allow the original form.js to handle the actual submission display
        // We re-dispatch a submit event so form.js can run its logic
        setTimeout(() => {
            form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
        }, 50);
    } else {
        formMessage.textContent = 'Please correct the errors above.';
        formMessage.classList.add('error');
    }
}

// Attach the validation listener to the form
form.addEventListener('submit', validateForm, { once: false });
