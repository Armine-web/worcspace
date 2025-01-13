import { api } from './apis/api.js'
import { Storage } from './utils/storage.js'

const handleLogin = async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  

  const credentials = {
    email, 
    password
  }


  const result = await api.auth.login(credentials);

  if (result.accessToken && result.user) {
    Storage.set('token', result.accessToken);
    Storage.set('user', result.user);
    window.location.assign("home.html");  
  } else {
    alert('Something Wrong')
  }
  
  

  console.log(credentials);
}


function createLoginLayout() {
  const container = UI.createElement("div", { class: "container-root" }, [
    UI.createElement("header", { class: "header" }, [
      UI.createElement("a", { href: "registration.html" }, "Sign Up")
    ]),
    UI.createElement("form", { class: "form-wrapper" }, [
      UI.createElement("div", { class: "form-container" }, [
        UI.createElement("input", {
          type: "text",
          id: "email",
          placeholder: "Email",
        }),
        UI.createElement("input", {
          type: "password",
          id: "password",
          placeholder: "Password",
        }),
        UI.createElement("button", { type: "submit" }, "Login"),
      ]),
    ]),
  ]);

  UI.render(container, document.body);


  const loginButton = document.querySelector('button[type="submit"]');
  loginButton.addEventListener("click", handleLogin);
}

createLoginLayout();


