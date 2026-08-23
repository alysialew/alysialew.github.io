/**
 * validation.js
 * Handles client-side validation for the #webForm element,
 * displaying custom inline error messages for each input field
 * and a general summary status message.
 */

document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('webForm');

    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');

    const fullNameError = document.getElementById('fullNameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const messageError = document.getElementById('messageError');
    const formMessage = document.getElementById('formMessage');

    let isSubmitting = false;

    console.log("validation.js loaded successfully.");

    // Real-time phone validation
    phoneInput.addEventListener('input', () => {

        if (/[a-zA-Z]/.test(phoneInput.value)) {
            phoneError.textContent = 'Phone number must contain numbers only.';
        } else {
            phoneError.textContent = '';
        }

    });

    function validateForm(event) {

        if (isSubmitting) {
            return;
        }

        event.preventDefault();

        let isValid = true;

        fullNameError.textContent = '';
        emailError.textContent = '';
        phoneError.textContent = '';
        messageError.textContent = '';
        formMessage.textContent = '';
        formMessage.className = 'form-message';

        // Full Name
        if (!fullNameInput.checkValidity()) {

            if (fullNameInput.validity.valueMissing) {
                fullNameError.textContent = 'Full name is required.';
            } else if (fullNameInput.validity.tooShort) {
                fullNameError.textContent = 'Full name must be at least 2 characters.';
            }

            isValid = false;
        }

        // Email
        if (!emailInput.checkValidity()) {

            if (emailInput.validity.valueMissing) {
                emailError.textContent = 'Email address is required.';
            } else if (emailInput.validity.typeMismatch) {
                emailError.textContent =
                    'Please enter a valid email address.';
            }

            isValid = false;
        }

        // Phone
        if (phoneInput.validity.valueMissing) {

            phoneError.textContent = 'Phone number is required.';
            isValid = false;

        } else if (/[a-zA-Z]/.test(phoneInput.value)) {

            phoneError.textContent =
                'Phone number must contain numbers only.';
            isValid = false;

        } else if (!/^\d{3}-\d{3}-\d{4}$/.test(phoneInput.value)) {

            phoneError.textContent =
                'Phone number must be in the format 123-456-7890.';
            isValid = false;
        }

        // Message
        if (!messageInput.checkValidity()) {

            if (messageInput.validity.valueMissing) {
                messageError.textContent = 'Message is required.';
            } else if (messageInput.validity.tooShort) {
                messageError.textContent =
                    'Message must be at least 10 characters.';
            }

            isValid = false;
        }

        if (isValid) {

            formMessage.textContent =
                'Form is valid! Submitting...';
            formMessage.className =
                'form-message success';

            isSubmitting = true;

            setTimeout(() => {

                form.dispatchEvent(
                    new Event('submit', {
                        bubbles: true,
                        cancelable: true
                    })
                );

                isSubmitting = false;

            }, 50);

        } else {

            formMessage.textContent =
                'Please correct the errors above.';
            formMessage.className =
                'form-message error';
        }
    }

    if (form) {
        form.addEventListener('submit', validateForm);
    }

});
