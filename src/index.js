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

function getTemperature(response) {
  console.log(response);
  let temperature = document.querySelector("#temperature");
  let cityName = document.querySelector("#city");
  let weatherDescription = document.querySelector("#weather-description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let locationTime = document.querySelector("#location-time");
  let weatherIcon = document.querySelector("#weather-icon");

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

let apiKey = "b2dt6f634c03ca0b6c80o88e820fa880";
//let query = formInput.value;
city = `New York`;
let units = "metric";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;

axios.get(apiUrl).then(getTemperature);
