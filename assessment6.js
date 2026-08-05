// assessment6.js — Alysia Lewis Personal Portfolio
// IT-FPX3240 Web Development and JavaScript
// Assessment 6: JavaScript Array and Loop Implementation

// --- Array Declaration ---
// Array of cybersecurity resources relevant to the Resources page.
// Each string is a resource name and URL separated by " | ".
let resources = [
  "TryHackMe — Hands-on cybersecurity learning | https://tryhackme.com",
  "Hack The Box — Penetration testing labs | https://hackthebox.com",
  "NIST Cybersecurity Framework | https://www.nist.gov/cyberframework",
  "OWASP Top 10 — Web application security risks | https://owasp.org/www-project-top-ten/",
  "Cybrary — Free cybersecurity courses | https://www.cybrary.it",
  "SANS Internet Storm Center | https://isc.sans.edu",
  "Splunk Free Training | https://www.splunk.com/en_us/training/free-courses.html",
  "CompTIA CertMaster Practice | https://www.comptia.org/training/certmaster-practice",
  "Shodan — Search engine for internet-connected devices | https://www.shodan.io",
  "VirusTotal — File and URL analysis | https://www.virustotal.com"
];

// --- Function: buildResourceList ---
// Uses a for loop to iterate over the resources array,
// building an HTML unordered list string through concatenation.
function buildResourceList() {

  // Log the start of the function to the console
  console.log("buildResourceList() called. Array length: " + resources.length);

  // Variable to hold the HTML string being built
  let listCode = "<ul>";

  // Loop through each item in the resources array
  for (let i = 0; i < resources.length; i++) {

    // Log each item as it is processed
    console.log("Processing item " + i + ": " + resources[i]);

    // Split the string at " | " to separate name from URL
    let parts = resources[i].split(" | ");
    let name = parts[0];
    let url  = parts[1];

    // Concatenate an <li> element with an anchor tag for each resource
    listCode += "<li><a href='" + url + "' target='_blank' rel='noopener'>" + name + "</a></li>";
  }

  // Close the unordered list
  listCode += "</ul>";

  // Log the completed HTML string
  console.log("Completed listCode HTML built successfully.");

  // Insert the list HTML into the paragraph with id="list"
  document.getElementById("list").innerHTML = listCode;
}

// --- Event Handler ---
// Trigger buildResourceList() when the page finishes loading.
window.onload = function () {
  console.log("window.onload fired — calling buildResourceList()");
  buildResourceList();
};
