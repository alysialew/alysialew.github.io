// weather.js — Alysia Lewis Personal Portfolio
// IT-FPX3240 Web Development and JavaScript
// Assessment 10: Weather Lookup Page with OpenWeatherMap API

// --- API Key ---
// Store your OpenWeatherMap API key as a constant.
// Replace the placeholder below with your actual key from openweathermap.org.
const API_KEY = "6f27405ae247f52b47e1d26d6f86db35";

// --- Get references to DOM elements ---
// Using getElementById() to select form, inputs, and display elements
const weatherForm    = document.getElementById("weatherForm");
const latInput       = document.getElementById("latitude");
const lonInput       = document.getElementById("longitude");
const weatherStatus  = document.getElementById("weather-status");
const weatherResults = document.getElementById("weather-results");
const wLocation      = document.getElementById("w-location");
const wTemp          = document.getElementById("w-temp");
const wDescription   = document.getElementById("w-description");

// --- Event Listener ---
// Attach a "submit" event listener to the weather form
weatherForm.addEventListener("submit", function (event) {

  // Prevent default form submission (page reload)
  event.preventDefault();

  // --- Get input values ---
  let lat = latInput.value.trim();
  let lon = lonInput.value.trim();

  // --- Validate inputs ---
  // Check that both fields have values and are valid numbers in range
  if (lat === "" || lon === "") {
    weatherStatus.textContent = "✖ Please enter both latitude and longitude.";
    weatherStatus.style.color = "var(--error)";
    weatherResults.classList.remove("visible");
    return; // Stop execution if inputs are empty
  }

  let latNum = parseFloat(lat);
  let lonNum = parseFloat(lon);

  if (isNaN(latNum) || latNum < -90 || latNum > 90) {
    weatherStatus.textContent = "✖ Latitude must be a number between -90 and 90.";
    weatherStatus.style.color = "var(--error)";
    return;
  }

  if (isNaN(lonNum) || lonNum < -180 || lonNum > 180) {
    weatherStatus.textContent = "✖ Longitude must be a number between -180 and 180.";
    weatherStatus.style.color = "var(--error)";
    return;
  }

  // --- Display loading message while API request is in progress ---
  weatherStatus.textContent = "⏳ Loading weather data...";
  weatherStatus.style.color = "var(--text-muted)";
  weatherResults.classList.remove("visible");

  // --- Build the API URL ---
  // units=imperial returns temperature in Fahrenheit
  let apiURL = "https://api.openweathermap.org/data/2.5/weather"
    + "?lat=" + latNum
    + "&lon=" + lonNum
    + "&units=imperial"
    + "&appid=" + API_KEY;

  // --- Make the API call using fetch() ---
  fetch(apiURL)
    .then(function (response) {
      // Parse the JSON response
      return response.json();
    })
    .then(function (data) {

      // Check for API-level errors (e.g. invalid key, city not found)
      if (data.cod && data.cod !== 200) {
        weatherStatus.textContent = "✖ Error: " + data.message;
        weatherStatus.style.color = "var(--error)";
        return;
      }

      // --- Extract and display data using dot notation ---
      // Location: city name and country code
      let locationName = data.name + ", " + data.sys.country;

      // Temperature: current temp in Fahrenheit (units=imperial)
      let temperature = data.main.temp.toFixed(1);

      // Weather description: first element of the weather array
      let description = data.weather[0].description;

      // Update the HTML elements with the retrieved data
      wLocation.textContent    = locationName;
      wTemp.textContent        = temperature;
      wDescription.textContent = description;

      // Show the results section and clear the status message
      weatherResults.classList.add("visible");
      weatherStatus.textContent = "✔ Weather data loaded successfully.";
      weatherStatus.style.color = "var(--success)";
    })
    .catch(function (error) {
      // Handle network or fetch errors
      weatherStatus.textContent = "✖ Unable to retrieve weather data. Please check your connection and try again.";
      weatherStatus.style.color = "var(--error)";
      console.error("Fetch error:", error);
    });
});
