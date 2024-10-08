let input = document.getElementById('input');
let qrImg = document.getElementById('qrimg');
let qrCode = document.getElementById('qrcode');
let button = document.getElementById('btn');

button.addEventListener('click', () => {
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${input.value}`;
    qrImg.style.display = 'block';
    qrImg.style.border = '1em solid #000';
    qrImg.style.borderRadius = '1em';
});