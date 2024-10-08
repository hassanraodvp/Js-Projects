let cityInput = document.getElementById("city-input"),
  searchBtn = document.getElementById("searchBtn"),
  locationBtn = document.getElementById("locationBtn"),
  api_key = "96e24161b58ec77f7336be4898fe6ac7",
  currentWeatherCard = document.querySelectorAll(".weather-left .card")[0],
  fiveDaysForecastCard = document.querySelector(".day-forecast"),
  aqiCard = document.querySelectorAll(".highlights .card")[0],
  sunriseCard = document.querySelectorAll(".highlights .card")[1],
  humidityVal = document.getElementById("humidityVal"),
  pressureVal = document.getElementById("pressureVal"),
  visibilityVal = document.getElementById("visibilityVal"),
  windSpeedVal = document.getElementById("windSpeedVal"),
  feelsVal = document.getElementById("feelsVal"),
  hourlyForecastCard = document.querySelector(".hourly-forecast"),
  aqiList = [
    "Very Good",
    "Good",
    "Moderate",
    "Unhealthy for Sensitive Groups",
    "Unhealthy",
    "Very Unhealthy",
    "Hazardous",
  ];

function getWeatherDetails(name, lat, lon, country, state) {
  let FORECAST_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}`,
    WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`,
    AIR_POLLUTION_API_URL = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${api_key}`;
  (days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]),
    (months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ]);

  fetch(AIR_POLLUTION_API_URL)
    .then((res) => res.json())
    .then((data) => {
      let { co, no, no2, o3, pm2_5, pm10, nh3 } = data.list[0].components;
      aqiCard.innerHTML = `
                 <div class="card-head">
                                <p>Air Quality Index</p>
                                <p class="air-index aqi-${
                                  data.list[0].main.aqi
                                }">${aqiList[data.list[0].main.aqi - 1]}</p>
                            </div>
                            <div class="air-indices">
                                <i class="fa-solid fa-wind"></i>
                                <div class="item">
                                    <p>PM2.5</p>  
                                    <h2>${pm2_5}</h2>
                                </div>
                                <div class="item">
                                    <p>PM10</p>
                                    <h2>${pm10}</h2>
                                </div>
                                <div class="item">
                                    <p>CO</p>
                                    <h2>${co}</h2>
                                </div>
                                <div class="item">
                                    <p>NO</p>
                                    <h2>${no}</h2>
                                </div>
                                <div class="item">
                                    <p>NO2</p>
                                    <h2>${no2}</h2>
                                </div>
                                <div class="item">
                                    <p>NH3</p>
                                    <h2>${nh3}</h2>
                                </div>
                                <div class="item">
                                    <p>O3</p> 
                                    <h2>${o3}</h2>
                                </div>
                            </div>
            `;
    })
    .catch(() => {
      alert("Failed to Fetch Air Pollution Details");
    });

  fetch(WEATHER_API_URL)
    .then((res) => res.json())
    .then((data) => {
      let date = new Date(data.dt * 1000); // Convert Unix timestamp to milliseconds
      currentWeatherCard.innerHTML = `
                <div class="current-weather">
                    <div class="details">
                        <p>Now</p>
                        <h2>${(data.main.temp - 273.15).toFixed(2)}&deg;C</h2>
                        <p>${data.weather[0].description}</p>
                    </div>
                    <div class="weather-icon">
                        <img src="https://openweathermap.org/img/wn/${
                          data.weather[0].icon
                        }.png" alt="weather-icon">
                    </div>
                </div>
                <hr>
                <div class="card-left-footer">
                    <p><i class="fa-regular fa-calendar"></i> ${
                      days[date.getDay()]
                    }, ${date.getDate()} ${
        months[date.getMonth()]
      } ${date.getFullYear()}</p>
                    <p><i class="fa-solid fa-location-dot"></i> ${name}, ${country}</p>
                </div>
            `;
      let { sunrise, sunset } = data.sys;
      let { timezone, visibility } = data,
        { humidity, pressure, feels_like } = data.main,
        { speed } = data.wind;

      let sRiseTime = moment
        .utc(sunrise, "X")
        .add(timezone, "seconds")
        .format("hh:mm A");
      let sSetTime = moment
        .utc(sunset, "X")
        .add(timezone, "seconds")
        .format("hh:mm A");

      sunriseCard.innerHTML = `
                <div class="card-head">
                    <p>Sunrise & Sunset</p>
                </div>
                <div class="sunrise-sunset">
                    <div class="item">
                        <div class="icon">
                            <img src="./img/sunrise.png" alt="Sunrise">
                        </div>
                        <div>
                            <p>Sunrise</p>
                            <h2>${sRiseTime}</h2>
                        </div>
                    </div>
                    <div class="item">
                        <div class="icon">
                            <img src="./img/sunset.png" alt="Sunset">
                        </div>
                        <div>
                            <p>Sunset</p>
                            <h2>${sSetTime}</h2>
                        </div>
                    </div>
                </div>
            `;
      humidityVal.innerHTML = `${humidity}%`;
      pressureVal.innerHTML = `${pressure}hPa`;
      visibilityVal.innerHTML = `${visibility / 1000} km`;
      windSpeedVal.innerHTML = `${speed}m/s`;
      feelsVal.innerHTML = `${(feels_like - 273.15).toFixed(2)}&deg;C`;
    })
    .catch(() => {
      alert("Failed to Fetch Weather Details");
    });

  fetch(FORECAST_API_URL)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch forecast data");
      }
      return res.json();
    })
    .then((data) => {
      if (!data || !data.list) {
        throw new Error("Invalid forecast data");
      }
      let hourlyForecast = data.list;

      hourlyForecastCard.innerHTML = ""; // Clear the existing content

      for (i = 0; i <= 7; i++) {
        let hrForecastDate = new Date(hourlyForecast[i].dt_txt);
        let hr = hrForecastDate.getHours();
        let a = "PM";

        if (hr < 12) a = "AM";
        if (hr === 0) hr = 12; // Use === for strict comparison
        if (hr > 12) hr = hr - 12;

        hourlyForecastCard.innerHTML += `
          <div class="card">
            <p>${hr} ${a}</p>
            <img src="https://openweathermap.org/img/wn/${
              hourlyForecast[i].weather[0].icon
            }.png" alt="weather-icon">
            <p>${(hourlyForecast[i].main.temp - 273.15).toFixed(2)}&deg;C</p>
          </div>
        `;
      }
      let uniqueForecastDays = [];
      let fiveDaysForecast = data.list.filter((forecast) => {
        let forecastDate = new Date(forecast.dt_txt).getDate();
        if (!uniqueForecastDays.includes(forecastDate)) {
          uniqueForecastDays.push(forecastDate);
          return true;
        }
        return false;
      });

      fiveDaysForecastCard.innerHTML = ""; // Ensure the card is cleared before adding new content
      for (let i = 0; i < fiveDaysForecast.length; i++) {
        // Changed loop to start from 0 to include the first forecast
        let date = new Date(fiveDaysForecast[i].dt_txt);
        fiveDaysForecastCard.innerHTML += `
                    <div class="forecast-item">
                        <div class="icon-wrapper">
                            <img src="https://openweathermap.org/img/wn/${
                              fiveDaysForecast[i].weather[0].icon
                            }.png">
                            <span>${(
                              fiveDaysForecast[i].main.temp - 273.15
                            ).toFixed(2)}&deg;C</span>
                        </div>
                        <p>${date.getDate()} ${months[date.getMonth()]}</p>
                        <p>${days[date.getDay()]}</p>
                    </div>
                `;
      }
    })
    .catch((error) => {
      alert(`Failed to Fetch Forecast Details: ${error.message}`);
    });
}

function getCityCoordinates() {
  let cityName = cityInput.value.trim();
  cityInput.value = "";
  if (!cityName) return; // Corrected condition to check if cityName is empty

  let GEOCODING_API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${api_key}`;
  fetch(GEOCODING_API_URL)
    .then((res) => res.json())
    .then((data) => {
      let { name, lat, lon, country, state } = data[0];
      getWeatherDetails(name, lat, lon, country, state);
    })
    .catch(() => {
      alert(`Failed to Fetch coordinates of ${cityName}`);
    });
}
function getUserCoordinates() {
  navigator.geolocation.getCurrentPosition((position) => {
    let { latitude, longitude } = position.coords;
    let REVERSE_GEOCODING_API_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${api_key}`;

    fetch(REVERSE_GEOCODING_API_URL)
      .then((res) => res.json())
      .then((data) => {
        let { name, lat, lon, country, state } = data[0];
        getWeatherDetails(name, lat, lon, country, state);
      })
      .catch(() => {
        alert("Failed to Fetch User Location");
      });
  });
}

searchBtn.addEventListener("click", getCityCoordinates);
locationBtn.addEventListener("click", getUserCoordinates);
