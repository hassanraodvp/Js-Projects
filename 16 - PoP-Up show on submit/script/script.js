let popup = document.getElementById('popup');

function openPopup() {
    document.getElementById('form-container').style.display = 'none';
    popup.classList.add('open-popup');
    return false;
}
function closePopup() {
    document.getElementById('form-container').style.display = 'block';
    document.getElementById('contact-form').reset();
    popup.classList.remove('open-popup')
}