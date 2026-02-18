const weatherBox = document.querySelector("#weather");

const lat = -29.68;
const lon = -51.13;

async function loadWeather() {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

    const response = await fetch(url);
    const data = await response.json();

    const temp = data.current_weather.temperature;
    const wind = data.current_weather.windspeed;
    const code = data.current_weather.weathercode;

    const condition = getWeatherDescription(code);
    const tip = getPhotoTip(temp, wind, code);

const locationName = "📍 Novo Hamburgo, RS — Brazil";

weatherBox.innerHTML = `
  <p style="opacity:0.8;">${locationName}</p>
  <p>🌡 Temperature: <strong>${temp}°C</strong></p>
  <p>☁ Condition: <strong>${condition}</strong></p>
  <p>💨 Wind: <strong>${wind} km/h</strong></p>
  <p style="margin-top:1rem;">📸 <em>${tip}</em></p>
`;


  } catch (error) {
    weatherBox.innerHTML = "<p>Could not load weather.</p>";
    console.error(error);
  }
}

function getWeatherDescription(code) {
  const map = {
    0: "Clear sky",
    1: "Mostly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Foggy",
    48: "Foggy",
    51: "Light drizzle",
    61: "Rain",
    63: "Rain",
    71: "Snow"
  };
  return map[code] || "Variable weather";
}

function getPhotoTip(temp, wind, code) {
  if (code === 0) return "Perfect for golden hour portraits.";
  if (wind > 25) return "Windy — great for dramatic shots, avoid tripod.";
  if (temp > 30) return "Harsh sunlight — try shooting in shade.";
  if (code >= 51) return "Rainy mood — great for street photography.";
  return "Good day for outdoor photography.";
}

loadWeather();
