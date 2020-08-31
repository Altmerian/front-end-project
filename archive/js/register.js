// autofill email field in register form with login value
const login = document.getElementById('login');
const email = document.getElementById('email');
login.addEventListener('change', function() {
    email.value = login.value;
})