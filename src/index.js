function change_background() {
  let day = new Date();
  let now = day.getHours();

  if (now > 5 && now < 12) {
    document.body.className = "morning";
  } else if (now > 12 && now < 18) {
    document.body.className = "day";
  } else if (now > 18 && now < 22) {
    document.body.className = "evening";
  } else {
    document.body.className = "night";
  }
}

change_background();
function formatDate(timestamp) {
  let now = new Date(timestamp);
  let dayIndex = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = dayIndex[now.getDay()];
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hour}:${minutes}`;
}

function search(city) {
  let apiKey = `483e555d11f508a7308255583271cc91`;
  let units = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}
function displayForecast(response) {
  let forecastTempDisplay = document.querySelector("#forecast-temp");
  let forecastTemp = Math.round(response.data.list[0].main.temp);
  forecastTempDisplay.innerHTML = `${forecastTemp}°`;
  let conditionIconId = response.data.list[0].weather[0].icon;
  let conditionIconUrl = `https://openweathermap.org/img/wn/${conditionIconId}@2x.png`;
  let forecastIcon = document.querySelector("#condition-icon");
  forecastIcon.setAttribute("src", conditionIconUrl);
  let forecastTime = new Date(response.data.list[0].dt * 1000);
  let forecastTimeDisplay = document.querySelector("#forecast-time");
  forecastTimeDisplay.innerHTML = formatDate(forecastTime);
}
function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  let city = searchInput.value;
  search(city);
}

let searchForm = document.querySelector(`#city-search`);
searchForm.addEventListener("submit", handleSubmit);
//Bonus Point
function findLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = `483e555d11f508a7308255583271cc91`;
  let units = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}
function showTemp(response) {
  let currentTemp = Math.round(response.data.main.temp);
  celsiusTemperature = Math.round(response.data.main.temp);
  let tempDisplay = document.querySelector(`#temp-display`);
  tempDisplay.innerHTML = `${currentTemp}`;
  let currentCity = response.data.name;
  let currentCountry = response.data.sys.country;
  let currentCityDisplay = document.querySelector(`#city-name`);
  currentCityDisplay.innerHTML = `${currentCity}, ${currentCountry}`;
  let conditionDisplay = document.querySelector(`#conditions`);

  conditionDisplay.innerHTML = response.data.weather[0].description;
  let currentTime = new Date(response.data.dt * 1000);
  let currentTimeDisplay = document.querySelector("#current-time");
  let formattedTime = formatDate(currentTime);
  currentTimeDisplay.innerHTML = `Last updated ${formattedTime}`;
  let iconDisplay = document.querySelector("#icon-element");
  iconDisplay.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconDisplay.setAttribute("alt", response.data.weather[0].description);
}

let locateMeButton = document.querySelector(`#locate-me-button`);
locateMeButton.addEventListener("click", findLocation);
search("Vernazza");

function displayFahrenheitTemp(event) {
  let tempDisplay = document.querySelector("#temp-display");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;

  tempDisplay.innerHTML = Math.round(fahrenheitTemperature);
  celsiusConvert.classList.remove("active");
  fahrenheitConvert.classList.add("active");
}
function displayCelsiusTemp(event) {
  let tempDisplay = document.querySelector("#temp-display");

  tempDisplay.innerHTML = Math.round(celsiusTemperature);
  celsiusConvert.classList.add("active");
  fahrenheitConvert.classList.remove("active");
}
let celsiusTemperature = null;
let celsiusConvert = document.querySelector("#cels-convert");
celsiusConvert.addEventListener("click", displayCelsiusTemp);
let fahrenheitConvert = document.querySelector("#fahr-convert");
fahrenheitConvert.addEventListener("click", displayFahrenheitTemp);
