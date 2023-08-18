let form = document.querySelector("#search-bar-form");

function submitForm(event) {
  event.preventDefault();
  let formInput = document.querySelector("#search-bar");
  let apiKey = "b2dt6f634c03ca0b6c80o88e820fa880";
  let query = formInput.value;
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${apiKey}&units=${units}`;
  let weatherDescription = document.querySelector("#weather-description");
  function getLocation(response) {
    console.log(response);
    let city = document.querySelector("#city");
    let weatherDescription = document.querySelector("#weather-description");
    let temperature = document.querySelector("#temperature");
    let humidity = document.querySelector("#humidity");
    let wind = document.querySelector("#wind");
    city.innerHTML = `${response.data.city}, ${response.data.country}`;
    weatherDescription.innerHTML = response.data.condition.description;
    temperature.innerHTML = `${Math.round(response.data.temperature.current)}°`;
    wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  }

  axios.get(apiUrl).then(getLocation);
}

form.addEventListener("submit", submitForm);
