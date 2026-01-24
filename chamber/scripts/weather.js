const currentTemp = document.querySelector("#current-temp");
const weatherDesc = document.querySelector("#weather-desc");
const forecastList = document.querySelector("#forecast");

const lat = 35.68;
const lon = 139.76;


const apiKey = "9802eec2d7f269c5b7c567054b39ba31";

const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function getWeather() {
  try {
    const response = await fetch(currentUrl);
    if (!response.ok) throw Error(await response.text());

    const data = await response.json();
    console.log("Current Weather:", data);

    currentTemp.innerHTML = `${data.main.temp.toFixed(1)} °C`;
    weatherDesc.textContent = data.weather[0].description;

    getForecast();

  } catch (error) {
    console.log("Weather Error:", error);
  }
}

async function getForecast() {
  try {
    const response = await fetch(forecastUrl);
    if (!response.ok) throw Error(await response.text());

    const data = await response.json();
    console.log("Forecast Data:", data);

    const daily = data.list.filter(item =>
      item.dt_txt.includes("12:00:00")
    ).slice(0, 3);

    forecastList.innerHTML = "";

    daily.forEach(day => {
      const li = document.createElement("li");

      const date = new Date(day.dt_txt);
      const weekday = date.toLocaleDateString("en-US", {
        weekday: "long"
      });

      li.textContent = `${weekday}: ${day.main.temp.toFixed(1)} °C`;
      forecastList.appendChild(li);
    });

  } catch (error) {
    console.log("Forecast Error:", error);
  }
}

getWeather();
