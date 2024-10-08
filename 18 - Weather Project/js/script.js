let input = document.getElementById('input');
let searchBtn = document.getElementById('search');

let temp = document.getElementById('temp');
let cloudyPosition = document.getElementById('cloud'); 
let humidity = document.getElementById('humidity');
let wind = document.getElementById('wind');
let city = document.getElementById('city');
let country = document.getElementById('country');

async function getWeather(cityName) {
    const promise = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=1f82f023cea543c1a1793941243105&q=${cityName}&aqi=yes`
    );
    return await promise.json()
};

searchBtn.addEventListener('click', async () => {
    const value = input.value;
    const result = await getWeather(value);
    temp.innerText = `${result.current.temp_c}°C`;
    cloudyPosition.innerText = `(${result.current.condition.text})`;
    city.innerText = `${result.location.name}`;
    country.innerText = `City of ${result.location.country}`;
    humidity.innerText = `${result.current.humidity}%`;
    wind.innerText = `${result.current.wind_kph} km/h`;

    const temperature = result.current.temp_c;
    if (temperature <= 0) {
        icon.src = 'img/freezing.png'; // Cold weather image
    } else if (temperature > 0 && temperature <= 20) {
        icon.src = 'img/cold.png'; // Cool weather image
    } else if (temperature > 20 && temperature <= 30) {
        icon.src = 'img/sun.png'; // Warm weather image
    } else {
        icon.src = 'img/hot.png'; // Hot weather image
    }
});

