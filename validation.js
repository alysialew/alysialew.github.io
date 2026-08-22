/**
 * validation.js
 * ITFPX3240 Assessment 9 – HTML5 + JavaScript Form Validation
 *
 * Handles client-side validation for the #webForm element,
 * displaying custom inline error messages for each input field
 * and a general summary status message.
 *
 * Demonstrates:
 * - document.getElementById() selection
 * - event.preventDefault() to intercept native submissions
 * - HTML5 Validity API (checkValidity(), validity.valueMissing, validity.tooShort, validity.patternMismatch)
 * - Safe programmatic submit event re-dispatching with a state flag to prevent infinite loops
 */

// Wait for the DOM content to fully load before attaching listeners
document.addEventListener('DOMContentLoaded', () => {

    // --- Step 1: Get a reference to the form element using document.getElementById() with id "webForm" ---
    const form = document.getElementById('webForm');

    // --- Step 2: Get references to your form input elements ---
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');

    // --- Step 3: Get references to your message display elements ---
    const fullNameError = document.getElementById('fullNameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const messageError = document.getElementById('messageError');
    const formMessage = document.getElementById('formMessage');

    // Flag to prevent infinite submission loop when form is valid and re-submitted programmatically
    let isSubmitting = false;

    console.log("validation.js loaded successfully.");
    console.log("Bound elements -> Form: ", form);

    /**
     * Step 4: Create a validation function taking the event parameter.
     * Validates individual field requirements, manages error displays, and triggers final processing.
     *
     * @param {SubmitEvent} event - The form submit event.
     */
    function validateForm(event) {
        // Bypass validation if this is our programmatic re-dispatch
        if (isSubmitting) {
            console.log("Validation bypassed for programmatic re-dispatch.");
            return;
        }

        // Step 5: Prevent default form submission so validation can run first
        event.preventDefault();
        console.log("Form submission intercepted. Running client-side validation...");

        // Step 6: Create a variable to track overall validity
        let isValid = true;

        // Reset previous error/status messages
        fullNameError.textContent = '';
        emailError.textContent = '';
        phoneError.textContent = '';
        messageError.textContent = '';
        formMessage.textContent = '';
        formMessage.className = 'form-message';

        // --- 1. Full Name Validation ---
        if (!fullNameInput.checkValidity()) {
            if (fullNameInput.validity.valueMissing) {
                fullNameError.textContent = 'Full name is required.';
                console.warn("Validation failed: Full Name is missing.");
            } else if (fullNameInput.validity.tooShort) {
                fullNameError.textContent = 'Full name must be at least 2 characters.';
                console.warn("Validation failed: Full Name is too short.");
            }
            isValid = false;
        }

        // --- 2. Email Address Validation ---
        if (!emailInput.checkValidity()) {
            if (emailInput.validity.valueMissing) {
                emailError.textContent = 'Email address is required.';
                console.warn("Validation failed: Email address is missing.");
            } else if (emailInput.validity.typeMismatch) {
                emailError.textContent = 'Please enter a valid email address (e.g., jane@example.com).';
                console.warn("Validation failed: Email format mismatch.");
            }
            isValid = false;
        }

        // --- 3. Phone Number Validation (Format: 123-456-7890) ---
        if (!phoneInput.checkValidity()) {
            if (phoneInput.validity.valueMissing) {
                phoneError.textContent = 'Phone number is required.';
                console.warn("Validation failed: Phone number is missing.");
            } else if (phoneInput.validity.patternMismatch) {
                phoneError.textContent = 'Please enter phone format: 123-456-7890.';
                console.warn("Validation failed: Phone pattern mismatch.");
            }
            isValid = false;
        }

        // --- 4. Message Validation ---
        if (!messageInput.checkValidity()) {
            if (messageInput.validity.valueMissing) {
                messageError.textContent = 'Message is required.';
                console.warn("Validation failed: Message is missing.");
            } else if (messageInput.validity.tooShort) {
                messageError.textContent = 'Message must be at least 10 characters.';
                console.warn("Validation failed: Message is too short.");
            }
            isValid = false;
        }

        // --- Step 7: Display Status and Submit ---
        if (isValid) {
            console.log("Validation passed! Displaying success status...");
            formMessage.textContent = 'Form is valid! Submitting...';
            formMessage.className = 'form-message success';

            // Set the submission flag to true to break the infinite submission loop
            isSubmitting = true;
            
            // Allow a short delay for the user to see the success message, then safely re-dispatch the submit event.
            // This event bubbles up and is captured by form.js for final output rendering!
            setTimeout(() => {
                console.log("Re-dispatching submit event programmatically...");
                form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
                isSubmitting = false; // Reset the flag after submission processes
            }, 50);

        } else {
            console.warn("Validation failed. Please correct form errors.");
            formMessage.textContent = 'Please correct the errors above.';
            formMessage.className = 'form-message error';
        }
    }

    // Attach event listener to form submission
    if (form) {
        form.addEventListener('submit', validateForm);
    } else {
        console.error("Error: Element with ID 'webForm' not found in DOM.");
    }
});

