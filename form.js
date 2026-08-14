// form.js
// DOM is fully loaded before running script
document.addEventListener('DOMContentLoaded', function () {
    // Get the form by ID
    const form = document.getElementById('webForm');

    // Get output div to display submitted data
    const outputDiv = document.getElementById('output');

    // Add event listener for form submission
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent page reload

        // Clear previous output
        outputDiv.innerHTML = '';

        // === Read form values ===

        // Text inputs
        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const organization = document.getElementById('organization').value.trim();
        const inquiryTopic = document.getElementById('inquiryTopic').value.trim();

        // Radio buttons: Visitor Type
        const visitorTypeRadios = document.getElementsByName('visitorType');
        let visitorType = '';
        for (const radio of visitorTypeRadios) {
            if (radio.checked) {
                visitorType = radio.value;
                break;
            }
        }

        // Checkboxes: Preferred Contact Methods
        const contactMethodCheckboxes = document.getElementsByName('contactMethod');
        const selectedMethods = [];
        for (const checkbox of contactMethodCheckboxes) {
            if (checkbox.checked) {
                selectedMethods.push(checkbox.value);
            }
        }

        // Dropdown: Experience Level
        const experienceLevel = document.getElementById('experienceLevel').value;

        // Textarea: Message
        const message = document.getElementById('message').value.trim();

        // Log data to console for debugging
        console.log({
            fullName,
            email,
            organization,
            inquiryTopic,
            visitorType,
            selectedMethods,
            experienceLevel,
            message
        });

        // === Display formatted output ===
        outputDiv.innerHTML = `
            <div class="submission-summary">
                <h3>Thank You, ${fullName}!</h3>
                <p><strong>Email:</strong> ${email}</p>
                ${organization ? `<p><strong>Organization:</strong> ${organization}</p>` : ''}
                ${inquiryTopic ? `<p><strong>Inquiry Topic:</strong> ${inquiryTopic}</p>` : ''}
                <p><strong>Visitor Type:</strong> ${capitalize(visitorType)}</p>
                <p><strong>Contact Methods:</strong> ${selectedMethods.length > 0 ? selectedMethods.map(capitalize).join(', ') : 'Not specified'}</p>
                <p><strong>Experience Level:</strong> ${capitalize(experienceLevel)}</p>
                <p><strong>Your Message:</strong><br><em>"${message}"</em></p>
            </div>
        `;

        // Optionally reset the form after submission
        // form.reset();
    });

    // Utility function to capitalize words
    function capitalize(str) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
});
