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
  let tempDisplay = document.querySelector(`#temp-display`);
  tempDisplay.innerHTML = `${currentTemp}`;
  let currentCity = response.data.name;
  let currentCountry = response.data.sys.country;
  let currentCityDisplay = document.querySelector(`#city-name`);
  currentCityDisplay.innerHTML = `${currentCity}, ${currentCountry}`;
  let conditionDisplay = document.querySelector(`#conditions`);
  console.log(response);
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
