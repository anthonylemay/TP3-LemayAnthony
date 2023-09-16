const form = document.getElementById('account-form');
const lastName = document.getElementById('last_name');
const firstName = document.getElementById('first_name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const username = document.getElementById('username');
const airport = document.getElementById('airport');
const password = document.getElementById('password');
const repeatPassword = document.getElementById('repeat_password');

const validateContactForm = () => {
    let noError = true;
    const lastNameValue = lastName.value.trim();
    const firstNameValue = firstName.value.trim();
    const emailValue = email.value.trim();
    const phoneValue = phone.value.trim();
    const usernameValue = username.value.trim();
    const airportValue = airport.value.trim();
    const passwordValue = password.value.trim();
    const repeatPasswordValue = repeatPassword.value.trim();
    const passwordValidationResult = validatePassword(passwordValue);

    if (passwordValue === '') {
        setError(password, 'Mot de passe requis.');
        noError = false;
    } else if (passwordValidationResult !== true) {
        setError(password, passwordValidationResult);
        noError = false;
    } else {
        setSuccess(password);
    }

    if (repeatPasswordValue === '') {
        setError(repeatPassword, 'Veuillez s.v.p. confirmer votre mot de passe.');
        noError = false;
    } else if (repeatPasswordValue !== passwordValue) {
        setError(repeatPassword, 'Les mots de passe ne correspondent pas.');
        noError = false;
    } else {
        setSuccess(repeatPassword);
    }

    if (usernameValue ===''){
        setError(username, 'Votre nom d’utilisateur est requis.');
        noError = false;
    } else{
        setSuccess(username);
    }

    if (phoneValue === ''){
        setError(phone, 'Votre numéro de téléphone est requis.');
        noError = false;
    } else if (!/^[\d]{3}-[\d]{3}-[\d]{4}$/.test(phoneValue)) {
        setError(phone, 'Veuillez entrer un numéro de téléphone valide.');
        noError = false;
    } else {
        setSuccess(phone);
    }

    if (airportValue ===''){
        setError(airport, 'Votre aéroport préféré est requis.');
        noError = false;
    } else{
        setSuccess(airport);
    }

    if (lastNameValue ===''){
        setError(lastName, 'Votre nom de famille est requis.');
        noError = false;
    } else{
        setSuccess(lastName);
    }
    if (firstNameValue ===''){
        setError(firstName, 'Votre prénom est requis.');
        noError = false;
    } else{
        setSuccess(firstName);
    }
    if (emailValue ===''){
        setError(email, 'Un courriel est requis.');
        noError = false;
    } else if (!validateEmail(emailValue)){
        setError(email, 'Veuillez entrer une adresse courriel valide.')
        noError = false;
    }else{
        setSuccess(email);
    }


    return noError;
}

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.errorMessage');

    errorDisplay.innerText = message;
    errorDisplay.style.display = 'block';
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.errorMessage');

    errorDisplay.innerText = '';
    errorDisplay.style.display = 'none';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}

const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validatePassword = (password) => {
    if (password.length < 8) return 'Votre mot de passe doit contenir au moins 8 caractères.';
    if (password.includes(' ')) return 'Votre mot de passe ne doit pas contenir d\'espaces.';
    if (!/[A-Z]/.test(password)) return 'Votre mot de passe doit contenir au moins une lettre majuscule.';
    if (!/[a-z]/.test(password)) return 'Votre mot de passe doit contenir au moins une lettre minuscule.';
    if (!/[0-9]/.test(password)) return 'Votre mot de passe doit contenir au moins un chiffre.';
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return 'Votre mot de passe doit contenir au moins un caractère spécial comme !, @, #, etc.';
    return true;
}


