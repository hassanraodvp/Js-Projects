$(document).ready(function() {
    $('.l').click(function() {
        $(this).toggleClass('active');
        $('body').toggleClass('dark');
    });
});

// Hour, minute, and second hands
let hour = document.getElementById('hour');
let min = document.getElementById('min');
let sec = document.getElementById('sec');

function displayTime() {
    let date = new Date();
    let hh = date.getHours() * 30;
    let mm = date.getMinutes() * 6;
    let ss = date.getSeconds() * 6;

    hour.style.transform = `rotateZ(${hh+(mm/12)}deg)`;
    min.style.transform = `rotateZ(${mm}deg)`;
    sec.style.transform = `rotateZ(${ss}deg)`;
};

setInterval(displayTime, 1000);
