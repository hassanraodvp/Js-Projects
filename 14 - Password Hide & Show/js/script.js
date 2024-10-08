let eye = document.getElementById('eyeicon');
let password = document.getElementById('password');

eye.addEventListener('click', () => {
    if (password.type === 'password') {
        password.type = 'text';
    } else {
        password.type = 'password';
    }
})