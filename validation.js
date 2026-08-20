/**
 * validation.js
 * ITFPX3240 Assessment 9 – HTML5 + JavaScript Form Validation
 *
 * Handles client-side validation for the #contactForm element,
 * displaying inline error messages and a summary status message.
 */

// Wait for the DOM content to fully load
document.addEventListener('DOMContentLoaded', () => {

    // --- Form and field references ---
    const form = document.getElementById('contactForm');

    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');

    // --- Error/status message containers ---
    const fullNameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const messageError = document.getElementById('messageError');
    const formMessage = document.getElementById('formMessage');

    // Flag to prevent recursive submission loop
    let isSubmitting = false;

    /**
     * Validates the form fields on submit.
     *
     * @param {SubmitEvent} event - The form submit event.
     */
    function validateForm(event) {
        // Bypass validation if this is our programmatic re-dispatch
        if (isSubmitting) return;

        event.preventDefault();

        let isValid = true;

        // Reset previous error messages
        fullNameError.textContent = '';
        emailError.textContent = '';
        phoneError.textContent = '';
        messageError.textContent = '';
        formMessage.textContent = '';
        formMessage.className = 'form-message';

        // --- Full Name validation ---
        if (!fullNameInput.checkValidity()) {
            if (fullNameInput.validity.valueMissing) {
                fullNameError.textContent = 'Full name is required.';
            } else if (fullNameInput.validity.tooShort) {
                fullNameError.textContent = 'Full name must be at least 2 characters.';
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

        // --- Phone Number validation ---
        if (!phoneInput.checkValidity()) {
            if (phoneInput.validity.valueMissing) {
                phoneError.textContent = 'Phone number is required.';
            } else if (phoneInput.validity.patternMismatch) {
                phoneError.textContent = 'Phone format must be 123-456-7890.';
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

            // Set flag to true so re-dispatching doesn't run validation infinitely
            isSubmitting = true;
            
            // Allow form.js to catch the submission
            setTimeout(() => {
                form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
                isSubmitting = false; // Reset flag after submit processes
            }, 50);
        } else {
            formMessage.textContent = 'Please correct the errors above.';
            formMessage.classList.add('error');
        }
    }

    // Attach validation listener to the form
    if (form) {
        form.addEventListener('submit', validateForm);
    }
});
