import { api } from './apis/api.js';
import { Storage } from './utils/storage.js';

function createForm() {
  const container = UI.createElement("div", { class: "container-root" }, [
    UI.createElement("header", { class: "header" }, [
      UI.createElement("a", { href: "index.html" }, "Log In"),
    ]),
    UI.createElement("form", { class: "form-wrapper" }, [
      UI.createElement("div", { class: "create-form-container" }, [
        UI.createElement("input", {
          type: "text",
          id: "firstName",
          name: "firstName",
          placeholder: "Enter First Name",
        }),
        UI.createElement("input", {
          type: "text",
          id: "lastName",
          name: "lastName",
          placeholder: "Enter Last Name",
        }),
        UI.createElement("input", {
          type: "text",
          id: "username",
          name: "username",
          placeholder: "Enter Username",
        }),
        UI.createElement("input", {
          type: "email",
          id: "email",
          name: "email",
          placeholder: "Enter Email",
        }),
        UI.createElement("input", {
          type: "password",
          id: "password",
          name: "password",
          placeholder: "Enter Password",
        }),
        UI.createElement("input", {
          id: "file-upload",
          type: "file",
        }),
        UI.createElement("div", { class: "" }, [
          UI.createElement("button", { id: "create-new-user" }, "Register"),
        ]),
      ]),
    ]),
  ]);

  UI.render(container, document.body);

  const createUserForm = document.getElementById("create-new-user");
  createUserForm.addEventListener("click", createUserHandler);
}


function initRegistration() {
  createForm();

  const queryString = window.location.search;
  const searchParams = new URLSearchParams(queryString);

  if (searchParams.has("id")) {
    const postId = searchParams.get("id");

    api.user.getUser(userId).then(user => {
      document.getElementById("firstName").value = user.firstName;
      document.getElementById("lastName").value = user.lastName;
      document.getElementById("username").value = user.username;
      document.getElementById("email").value = user.email;
      document.getElementById("file-upload").value = user.avatar ? user.img : "";   
    }).catch(() => {
      window.location.assign("registration.html");
    })
  }
}

initRegistration();


async function createUserHandler(event) {
  event.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const fileUpload = document.getElementById("file-upload");


  if (!firstName ||!lastName || !username || !email || !password) {
    alert("Please fill in all fields.");
    return;
  }


  let uploadedFile = null;
  if (fileUpload.files.length > 0) {
    try {
      const file = fileUpload.files[0];
      uploadedFile = await api.fileUpload.upload(file); 
    } catch (error) {
      console.error("File upload failed:", error);
      alert("File upload failed. Please try again.");
      return;
    }
  }
  

  const user = Storage.getItem('user');

  const newUser = {
    firstName,
    lastName,
    username,
    email,
    password,
    avatar:  uploadedFile.url,
    userId: user,
  };


  try {
    const result = await api.auth.register(newUser);
    if (result.id) {
      alert("Registration successful!");
      window.location.assign("index.html");
    } else {
      throw new Error("Registration failed. Please try again.");
    }
  } catch (error) {
    console.error("Error during registration:", error);
    alert("Something went wrong. Please check your data and try again.");
  }


}


