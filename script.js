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
 
(function () {
  const loadBtn = document.getElementById("t3-loadQuote");
  const quoteEl = document.getElementById("t3-quote");
  const authorEl = document.getElementById("t3-author");
  if (!loadBtn || !quoteEl || !authorEl) return;

  loadBtn.addEventListener("click", function () {
    loadBtn.disabled = true;
    quoteEl.textContent = "Loading…";
    authorEl.textContent = "";

    fetch("https://dummyjson.com/quotes/random")
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then(function (data) {
        quoteEl.textContent = data.content;
        authorEl.textContent = "— " + data.author;
      })
      .catch(function (err) {
        quoteEl.textContent = "Could not load a quote right now.";
        authorEl.textContent = "— Please try again.";
        console.error(err);
      })
      .finally(function () {
        loadBtn.disabled = false;
      });
  });
})();


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
(function () {
  const wxBtn  = document.getElementById("t4-loadWx");
  const tempEl = document.getElementById("t4-temp");
  const humEl  = document.getElementById("t4-hum");
  const windEl = document.getElementById("t4-wind");
  if (!wxBtn || !tempEl || !humEl || !windEl) return;

  const API_KEY = "1e134d1402881758ecd253bcd0d0d300";

  wxBtn.addEventListener("click", function () {
    wxBtn.disabled = true;
    tempEl.textContent = humEl.textContent = windEl.textContent = "…";

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=Dammam&appid=${API_KEY}&units=metric`)
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then(function (data) {
        tempEl.textContent = Math.round(data.main.temp) + " °C";
        humEl.textContent  = data.main.humidity + " %";
        windEl.textContent = data.wind.speed + " m/s";
      })
      .catch(function (err) {
        tempEl.textContent = "Error";
        humEl.textContent  = "Error";
        windEl.textContent = "Error";
        console.error("Weather fetch failed:", err);
      })
      .finally(function () {
        wxBtn.disabled = false;
      });
  });
})();
