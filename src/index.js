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

function showForecast() {
  let forecast = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
          <div class="col-2">
            <div class="forecast-day">${day}</div>
            <img
              src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-day.png"
              alt=""
              width="70px"
            />
            <div class="forecast-temperature">
              <span class="forecast-max-temperature">23°</span> /
              <span class="forecast-min-temperature">15°</span>
            </div>
          </div>
        `;
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
  showForecast();

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
  let temp = document.querySelector("#temperature");
  temp.innerHTML = `${fahrTemp}°`;
  cels.classList.remove("active");
  fahr.classList.add("active");
}

function changeToCels() {
  let temp = document.querySelector("#temperature");
  temp.innerHTML = `${Math.round(celsiusTemp)}°`;
  cels.classList.add("active");
  fahr.classList.remove("active");
}

let celsiusTemp = null;
let fahr = document.querySelector("#fahr");
let cels = document.querySelector("#cels");
fahr.addEventListener("click", changeToFahr);
cels.addEventListener("click", changeToCels);
searchCity("Bratislava");
