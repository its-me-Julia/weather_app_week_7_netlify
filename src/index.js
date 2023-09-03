function getDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day}, ${hours}:${minutes}`;
}

function getForecast(coordinates) {
  let apiKey = `b2dt6f634c03ca0b6c80o88e820fa880`;
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showForecast);
}
function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day}`;
}

function showForecast(response) {
  let forecastData = response.data.daily;
  celsiusMaxTempForecast = response.data.daily[0].temperature.maximum;
  celsiusMinTempForecast = response.data.daily[0].temperature.minimum;
  let forecast = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecastData.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
          <div class="col-2">
            <div class="forecast-day">${formatForecastDay(
              forecastDay.time
            )}</div>
            <img
              src="${forecastDay.condition.icon_url}"
              alt=""
              width="70px"
            />
            <div class="forecast-temperature">
              <span class="forecast-max-temperature" id="forecast-max-temperature">${Math.round(
                forecastDay.temperature.maximum
              )}°</span> /
              <span class="forecast-min-temperature" id="forecast-min-temperature">${Math.round(
                forecastDay.temperature.minimum
              )}°</span>
            </div>
          </div>
        `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

function getTemperature(response) {
  let temperature = document.querySelector("#temperature");
  let cityName = document.querySelector("#city");
  let weatherDescription = document.querySelector("#weather-description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let locationTime = document.querySelector("#location-time");
  let weatherIcon = document.querySelector("#weather-icon");
  getForecast(response.data.coordinates);
  celsiusTemp = response.data.temperature.current;

  temperature.innerHTML = `${Math.round(response.data.temperature.current)}°`;
  cityName.innerHTML = `${response.data.city}, ${response.data.country}`;
  weatherDescription.innerHTML = response.data.condition.description;
  humidity.innerHTML = Math.round(response.data.temperature.humidity);
  wind.innerHTML = Math.round(response.data.wind.speed);
  locationTime.innerHTML = getDate(response.data.time);
  weatherIcon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  weatherIcon.setAttribute("alt", `${response.data.condition.description}`);
}

function searchCity(city) {
  let apiKey = "b2dt6f634c03ca0b6c80o88e820fa880";

  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(getTemperature);
}
function submitForm(event) {
  event.preventDefault();
  let searchBarInput = document.querySelector("#search-bar");
  searchCity(searchBarInput.value);
}

let searchForm = document.querySelector("#search-bar-form");
searchForm.addEventListener("submit", submitForm);

function changeToFahr() {
  let fahrTemp = Math.round((celsiusTemp * 9) / 5 + 32);
  let fahrTempMaxForecast = Math.round((celsiusMaxTempForecast * 9) / 5 + 32);
  let fahrTempMinForecast = Math.round((celsiusMinTempForecast * 9) / 5 + 32);
  let temp = document.querySelector("#temperature");
  let maxTempForecast = document.querySelector("#forecast-max-temperature");
  let minTempForecast = document.querySelector("#forecast-min-temperature");
  temp.innerHTML = `${fahrTemp}°`;
  maxTempForecast.innerHTML = `${fahrTempMaxForecast}°`;
  minTempForecast.innerHTML = `${fahrTempMinForecast}°`;
  cels.classList.remove("active");
  fahr.classList.add("active");
}

function changeToCels() {
  let temp = document.querySelector("#temperature");
  let maxTempForecast = document.querySelector("#forecast-max-temperature");
  let minTempForecast = document.querySelector("#forecast-min-temperature");
  maxTempForecast.innerHTML = `${Math.round(celsiusMaxTempForecast)}°`;
  minTempForecast.innerHTML = `${Math.round(celsiusMinTempForecast)}°`;
  temp.innerHTML = `${Math.round(celsiusTemp)}°`;
  cels.classList.add("active");
  fahr.classList.remove("active");
}

let celsiusTemp = null;
let celsiusMaxTempForecast = null;
let celsiusMinTempForecast = null;
let fahr = document.querySelector("#fahr");
let cels = document.querySelector("#cels");
fahr.addEventListener("click", changeToFahr);
cels.addEventListener("click", changeToCels);
searchCity("Bratislava");
