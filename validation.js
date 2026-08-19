/**
 * validation.js
 * ITFPX3240 Assessment 9 – HTML5 + JavaScript Form Validation
 *
 * Handles client-side validation for the #webForm element,
 * displaying inline error messages and a summary status message.
 */

// --- Form and field references ---
const form = document.getElementById('webForm');

const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

// --- Error/status message containers ---
const fullNameError = document.getElementById('fullNameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');
const formMessage = document.getElementById('formMessage');

/**
 * Validates the form fields on submit.
 * Prevents default submission until validation passes,
 * then re-dispatches the submit event for form.js to handle.
 *
 * @param {SubmitEvent} event - The form submit event.
 */
function validateForm(event) {
    event.preventDefault();

    let isValid = true;

    // Reset previous messages
    fullNameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';
    formMessage.textContent = '';
    formMessage.className = 'form-message';

    // --- Full Name validation ---
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

    // --- Email validation ---
    if (!emailInput.checkValidity()) {
        if (emailInput.validity.valueMissing) {
            emailError.textContent = 'Email address is required.';
        } else if (emailInput.validity.typeMismatch) {
            emailError.textContent = 'Please enter a valid email address.';
        }
        isValid = false;
    }

    // --- Message validation ---
    if (!messageInput.checkValidity()) {
        if (messageInput.validity.valueMissing) {
            messageError.textContent = 'Message is required.';
        } else if (messageInput.validity.tooShort) {
            messageError.textContent = 'Message must be at least 10 characters.';
        }
        isValid = false;
    }

    // --- Final result ---
    if (isValid) {
        formMessage.textContent = 'Form is valid! Submitting...';
        formMessage.classList.add('success');

        // Re-dispatch the submit event so form.js can handle the actual submission.
        setTimeout(() => {
            form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
        }, 50);
    } else {
        formMessage.textContent = 'Please correct the errors above.';
        formMessage.classList.add('error');
    }
}

// Attach validation listener to the form
form.addEventListener('submit', validateForm);
