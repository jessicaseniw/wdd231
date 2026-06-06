/* ==== WEATHER JS ==== */

const apiKey = "5d7a574be290b819810371ce389ec5b7";

const lat = -29.9538;
const lon = -51.0941;

const weatherURL =
    `https://api.openweathermap.org/data/2.5/forecast?id=3468403&units=metric&appid=${apiKey}`;

async function getWeather() {
    try {

        const response = await fetch(weatherURL);
        const data = await response.json();

        displayWeather(data);

    } catch (error) {
        console.error("Weather error:", error);
    }
}

function displayWeather(data) {

    const current = data.list[0];

    document.querySelector("#currentTemp").textContent =
        Math.round(current.main.temp);

    document.querySelector("#weatherDescription").textContent =
        current.weather[0].description;

    const icon = current.weather[0].icon;

    document.querySelector("#weatherIcon").src =
        `https://openweathermap.org/img/wn/${icon}@2x.png`;

    document.querySelector("#forecast1").textContent =
        `${Math.round(data.list[0].main.temp)}°C`;

    document.querySelector("#forecast2").textContent =
        `${Math.round(data.list[8].main.temp)}°C`;

    document.querySelector("#forecast3").textContent =
        `${Math.round(data.list[16].main.temp)}°C`;
}

getWeather();