// validation.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm'); // use your actual form id
    
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // stop normal submission
        
        // Check overall validity
        if (!form.checkValidity()) {
            event.stopPropagation();
            form.classList.add('was-validated');
            
            // Loop through inputs and set custom messages
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                if (!input.validity.valid) {
                    input.setCustomValidity(getErrorMessage(input));
                } else {
                    input.setCustomValidity('');
                }
            });
        } else {
            // Form is valid - process it
            displayFormData(form);
        }
    });
    
    function getErrorMessage(input) {
        if (input.validity.valueMissing) return 'This field is required';
        if (input.validity.tooShort) return `Must be at least ${input.minLength} characters`;
        if (input.validity.patternMismatch) return 'Please match the requested format';
        if (input.validity.typeMismatch) return 'Please enter a valid email';
        return 'Invalid input';
    }
});

