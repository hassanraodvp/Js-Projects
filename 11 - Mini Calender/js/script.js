let date = document.getElementById('date');
let day = document.getElementById('day');
let month = document.getElementById('month');
let year = document.getElementById('year');

const today = new Date();

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

day.innerHTML = weekDays[today.getDay()];
month.innerHTML = months[today.getMonth()];
date.innerHTML = today.getDate();
year.innerHTML = today.getFullYear();