/*
=======================================
📘 JavaScript & Web APIs Lab
All tasks in one file (script.js)
=======================================
*/

/*  
=======================================
TODO1: Welcome Board
---------------------------------------
When the page loads, display a welcome message 
inside the <p> element with id="t1-msg".

✅ Task:
- Select the element with id "t1-msg".
- Change its text to "Hello, World!".

💡 Hint:
document.getElementById("t1-msg").innerHTML = "Hello, World!";
*/
 document.addEventListener("DOMContentLoaded", function () {
  const msgEl = document.getElementById("t1-msg");
  if (msgEl) msgEl.textContent = "Hello, World!";
});

/*  
=======================================
TODO2: Interaction Corner
---------------------------------------
There is a button with id="t2-btn".
When the button is clicked, change the text inside 
the <p> with id="t2-status" to:
    "You clicked the button!"

✅ Task:
- Get the button element.
- Add a click event listener.
- Inside the event, change the text of the status paragraph.

💡 Hint:
button.addEventListener("click", function () {
    // change text here
});
*/
 (function () {
  const statusEl = document.getElementById("t2-status");
  const btn = document.getElementById("t2-btn");
  if (!statusEl || !btn) return;

  btn.addEventListener("click", function () {
    statusEl.textContent = "You clicked the button!";
  });
})();

/*  
=======================================
TODO3: Inspiring Quote Board
---------------------------------------
Use the Quotable API to display a random quote.

🌍 API Link:
https://dummyjson.com/quotes/random

✅ Task:
- When the button with id="t3-loadQuote" is clicked:
    - Fetch a random quote from the API.
    - Display the quote text inside the <p> with id="t3-quote".
    - Display the author inside the <p> with id="t3-author".

💡 Hint:
The API returns JSON like:
{
  "content": "Do not watch the clock. Do what it does. Keep going.",
  "author": "Sam Levenson"
}

Use:
data.content   // the quote text
data.author    // the author
*/
 
const quoteBtn   = document.getElementById("t3-loadQuote");
const quoteText  = document.getElementById("t3-quote");
const quoteAuthor = document.getElementById("t3-author");

quoteBtn.addEventListener("click", () => {
  fetch("https://dummyjson.com/quotes/random")
    .then(res => {
      if (!res.ok) {
        throw new Error("Network response failed: " + res.status);
      }
      return res.json();
    })
    .then(data => {
      // Use correct field: `quote`
      quoteText.textContent  = data.quote || "No quote found.";
      quoteAuthor.textContent = "— " + (data.author || "Anonymous");
    })
    .catch(err => {
      quoteText.textContent  = "Couldn’t load a quote.";
      quoteAuthor.textContent = "";
      console.error("Quote fetch error:", err);
    });
});

/*  
=======================================
TODO4: Dammam Weather Now
---------------------------------------
Use the OpenWeatherMap API to display live weather data.

🌍 API Link:
https://api.openweathermap.org/data/2.5/weather?q=Dammam&appid=API_KEY=metric

⚠️ Replace YOUR_API_KEY with your actual API key from:
https://openweathermap.org/api

✅ Task:
- When the button with id="t4-loadWx" is clicked:
    - Fetch current weather data for Dammam.
    - Show temperature in the element with id="t4-temp".
    - Show humidity in the element with id="t4-hum".
    - Show wind speed in the element with id="t4-wind".

💡 Hint:
data.main.temp      → temperature (°C)
data.main.humidity  → humidity (%)
data.wind.speed     → wind speed (m/s)
*/
const loadWeatherBtn = document.getElementById("t4-loadWx");
const tempOutput     = document.getElementById("t4-temp");
const humidityOutput = document.getElementById("t4-hum");
const windOutput     = document.getElementById("t4-wind");

loadWeatherBtn.addEventListener("click", () => {
  fetch("https://api.openweathermap.org/data/2.5/weather?q=Dammam&appid=1e134d1402881758ecd253bcd0d0d300&units=metric")
    .then(response => {
      if (!response.ok) {
        throw new Error("Request failed with status " + response.status);
      }
      return response.json();
    })
    .then(data => {
      tempOutput.textContent     = `${data.main.temp} °C`;
      humidityOutput.textContent = `${data.main.humidity} %`;
      windOutput.textContent     = `${data.wind.speed} m/s`;
    })
    .catch(error => {
      tempOutput.textContent     = "N/A";
      humidityOutput.textContent = "N/A";
      windOutput.textContent     = "N/A";
      console.error("Weather data could not be retrieved:", error);
    });
});
