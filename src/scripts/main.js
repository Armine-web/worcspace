import { API } from './api.js';

function createContainer() {
    const container = UI.createElement('div', {class: "container-root"}, [
        UI.createElement('div', {class: "header"}, [
            UI.createElement("a", { href: "./registration.html" }, "Registration")
        ]),

        UI.createElement("div", {class: "form-wrapper"}, [
            UI.createElement("div", {class: "form-container"}, [
                UI.createElement("form", {id: "loginForm"}, [
                    UI.createElement("input", {type: "email", id: "email", placeholder: "Email", required: true}),
                    UI.createElement("input", {type: "password", id: "password", placeholder: "Password", required: true}),
                    UI.createElement("button", {type: "submit"}, "Login"),
                ]),
                UI.createElement("div", {id: "errorMessage", style: "color:red; display:none;"}, "Invalid email or password!")
            ])
        ])
    ]);

    UI.render(container, document.body);

    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', handleLogin);
}

function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const api = new API('https://simple-blog-api-red.vercel.app/api');
    api.post('auth/login', { email, password })
        .then(response => {
            console.log(response)
            if (response && response.accessToken) {
                localStorage.setItem('authToken', response.accessToken); 
                window.location.href = './home.html'; 
            } else {
                document.getElementById('errorMessage').style.display = 'block'; 
            }
        })
        .catch(error => {
            console.error('Login failed:', error);
            document.getElementById('errorMessage').style.display = 'block';
        });
}

createContainer();

