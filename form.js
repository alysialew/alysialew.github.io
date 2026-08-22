/**
 * form.js
 * ITFPX3240 Assessment 8 – Getting Started with JavaScript Form Processing
 * 
 * This script processes the contact form on contact.html.
 * It reads the values entered by the user, validates that the form is technically valid,
 * formats the data into a clean, professional summary card, and displays it in the
 * #output element.
 * 
 * Demonstrates the required use of:
 * - document.getElementById()
 * - document.getElementsByName()
 * - document.getElementsByTagName()
 * - Form event listening and event.preventDefault()
 * - Detailed console.log() statements for debugging and verification
 */

// Wait for the DOM content to fully load before attaching listeners
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Step 1: Get references to form and output using document.getElementById() ---
    const form = document.getElementById('webForm');
    const outputDiv = document.getElementById('output');

    console.log("form.js loaded successfully. Target form: ", form);
    console.log("Target output container: ", outputDiv);

    // If form or output area doesn't exist, exit early to avoid errors
    if (!form || !outputDiv) {
        console.error("Critical error: form.js could not find the #webForm or #output elements in the DOM.");
        return;
    }

    /**
     * Event handler for form submission.
     * Captures form data, logs progress, formats values, and renders them to the page.
     * 
     * @param {SubmitEvent} event - The form submit event.
     */
    form.addEventListener('submit', function(event) {
        // Stop default form reload behavior to allow JavaScript output processing
        event.preventDefault();
        
        console.log("--- Form Submission Event Intercepted by form.js ---");

        // Use checkValidity() to ensure we only process and display valid form data.
        // This coordinates beautifully with validation.js.
        if (!form.checkValidity()) {
            console.log("Form is currently invalid. Aborting output display. Let validation.js show errors.");
            outputDiv.innerHTML = ''; // Clear previous outputs if invalid
            return;
        }

        console.log("Form validation passed. Starting data extraction...");

        // --- Step 2: Retrieve Text & Textarea Inputs using document.getElementById() ---
        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();

        console.log(`[Text Inputs] Name: "${fullName}", Email: "${email}", Phone: "${phone}", Message: "${message.substring(0, 15)}..."`);

        // --- Step 3: Retrieve Radio Button Group using document.getElementsByName() ---
        const visitorRadios = document.getElementsByName('visitorType');
        let selectedVisitorType = 'None selected';

        console.log(`[Radios] Found ${visitorRadios.length} options for 'visitorType'. Checking selection...`);
        for (let i = 0; i < visitorRadios.length; i++) {
            if (visitorRadios[i].checked) {
                selectedVisitorType = visitorRadios[i].value;
                // Capitalize first letter for professional display
                selectedVisitorType = selectedVisitorType.charAt(0).toUpperCase() + selectedVisitorType.slice(1);
                break;
            }
        }
        console.log(`[Radios] Selected Visitor Type: "${selectedVisitorType}"`);

        // --- Step 4: Retrieve Checkbox Group using document.getElementsByName() ---
        const contactCheckboxes = document.getElementsByName('contactMethod');
        let selectedContactMethods = [];

        console.log(`[Checkboxes] Found ${contactCheckboxes.length} options for 'contactMethod'. Gathering checked elements...`);
        for (let i = 0; i < contactCheckboxes.length; i++) {
            if (contactCheckboxes[i].checked) {
                // Capitalize checkbox values for consistent formatting
                let method = contactCheckboxes[i].value;
                method = method.charAt(0).toUpperCase() + method.slice(1);
                selectedContactMethods.push(method);
            }
        }
        
        // Format checkbox list or provide a default if none selected
        const contactMethodsDisplay = selectedContactMethods.length > 0 
            ? selectedContactMethods.join(', ') 
            : 'None selected';
        console.log(`[Checkboxes] Checked Methods: "${contactMethodsDisplay}"`);

        // --- Step 5: Retrieve Dropdown Menu details using document.getElementsByTagName() ---
        const selectElement = document.getElementById('experienceLevel');
        let selectedExperienceText = 'Not specified';

        if (selectElement) {
            // Get all <option> tags nested within our select element
            const options = selectElement.getElementsByTagName('option');
            console.log(`[Dropdown] Found ${options.length} options via getElementsByTagName('option'). Finding selected...`);
            
            for (let i = 0; i < options.length; i++) {
                if (options[i].selected) {
                    selectedExperienceText = options[i].text;
                    break;
                }
            }
        }
        console.log(`[Dropdown] Selected Experience Level: "${selectedExperienceText}"`);

        // --- Step 6: Demonstrating getElementsByTagName on inputs for debugging/logging ---
        const allFormInputs = form.getElementsByTagName('input');
        console.log(`[DOM Log] Total input tags processed inside form: ${allFormInputs.length}`);

        // --- Step 7: Build and Renders the Form Summary HTML ---
        console.log("Structuring gathered data into HTML output card...");
        
        const summaryHTML = `
            <div class="summary-card" style="margin-top: 25px; padding: 20px; border: 2px solid #333; border-radius: 8px; background-color: #f9f9f9; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <h3 style="margin-top: 0; color: #1a365d; border-bottom: 2px solid #1a365d; padding-bottom: 8px;">
                    Form Submission Summary
                </h3>
                <table style="width: 100%; border-collapse: collapse; text-align: left;">
                    <tbody>
                        <tr style="border-bottom: 1px solid #ddd;">
                            <td style="padding: 10px 0; font-weight: bold; width: 35%;">Full Name:</td>
                            <td style="padding: 10px 0;">${fullName}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #ddd;">
                            <td style="padding: 10px 0; font-weight: bold;">Email Address:</td>
                            <td style="padding: 10px 0;">${email}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #ddd;">
                            <td style="padding: 10px 0; font-weight: bold;">Phone Number:</td>
                            <td style="padding: 10px 0;">${phone}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #ddd;">
                            <td style="padding: 10px 0; font-weight: bold;">Visitor Type:</td>
                            <td style="padding: 10px 0;">${selectedVisitorType}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #ddd;">
                            <td style="padding: 10px 0; font-weight: bold;">Preferred Contact:</td>
                            <td style="padding: 10px 0;">${contactMethodsDisplay}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #ddd;">
                            <td style="padding: 10px 0; font-weight: bold;">Experience Level:</td>
                            <td style="padding: 10px 0;">${selectedExperienceText}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; font-weight: bold; vertical-align: top;">Message:</td>
                            <td style="padding: 10px 0; white-space: pre-wrap;">${message}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;

        // Render to the page
        outputDiv.innerHTML = summaryHTML;
        console.log("Form summary successfully rendered inside #output element.");
        console.log("--- End of Form Submission Processing ---");
    });

    // Handle form clearing/reset to clean up the output card as well
    form.addEventListener('reset', () => {
        console.log("Form reset event triggered. Clearing output card.");
        outputDiv.innerHTML = '';
    });
});
