import { API } from './api.js';

class RegistrationService {
    constructor() {
        this.api = new API('https://simple-blog-api-red.vercel.app/api');
    }

    registerUser(userData) {
        this.api.post('auth/register', userData)
            .then(response => {
                if (response && response.id) {
                    alert('Registration successful!');
                   
                    window.location.href = './index.html'; 
                } else {
                    alert('Registration failed. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error registering user:', error);
                alert('Error registering user. Please try again.');
            });
    }
}

const registrationForm = document.getElementById('registrationForm');
const registrationService = new RegistrationService();

registrationForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const userData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };
    registrationService.registerUser(userData);
});

