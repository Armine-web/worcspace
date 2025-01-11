import { api } from './apis/api.js'; 
import { Storage } from "./utils/storage.js";


function createForm(post = {}) {
  const container = UI.createElement("div", { class: "container-root" }, [
    UI.createElement("header", { class: "header" }, [
      UI.createElement("a", { href: "home.html" }, "Home"),
    ]),
    UI.createElement("form", { class: "form-wrapper" }, [
      UI.createElement("div", { class: "create-form-container" }, [
        UI.createElement("input", {
          type: "text",
          id: "postTitle",
          name: "postTitle",
          value: post.title || '',
          placeholder: "Enter post title",
        }),
        UI.createElement("textarea", {
          id: "postStory",
          name: "postStory",
          value: post.story || '',
          placeholder: "Enter your story here",
          rows: "5",
          cols: "50",
        }),
        UI.createElement("input", {
          id: "file-upload",
          type: "file",
        }),
        UI.createElement("div", { class: "" }, [
          UI.createElement("button", { id: "create-new-post" }, post.id ? "Update Post" : "Create Post"),
        ]),
      ]),
    ]),
  ]);

  UI.render(container, document.body);

  const createPostForm = document.getElementById("create-new-post");
  createPostForm.addEventListener("click", createPostHandler);


  if (post.id) {
    document.getElementById("postTitle").value = post.title;
    document.getElementById("postStory").value = post.story;
  }
}
 let oldPost = null;
function initApplicants() {
  const queryString = window.location.search;
  const searchParams = new URLSearchParams(queryString);

  if (searchParams.has("id")) {
    const postId = searchParams.get("id");

    api.updatePost.getPostById(postId)
      .then(post => {
        oldPost = post;
        createForm(post);
      })
      .catch(() => {
        window.location.assign("home.html");
      });
  } else {
    createForm();
  }
}

initApplicants();

async function createPostHandler(event) {
    
  event.preventDefault();

  const title = document.getElementById("postTitle").value.trim();
  const story = document.getElementById("postStory").value.trim();
  const fileUpload = document.getElementById("file-upload");



 let imgUrl = null;

  if(!fileUpload.files.lengt){
    const uploadedFile = await api.fileUpload.upload(fileUpload.files[0]);
    imgUrl =uploadedFile.url;
  }
  
   

  if (!title || !story) {
    alert("Please fill in all fields.");
    return;
  }

  const uploadedFile = await api.fileUpload.upload(fileUpload.files[0]);
  const user = Storage.getItem('user');

  const newPost = {
    title,
    story,
    authorName: user.username,
    img: imgUrl|| oldPost.img,
    userId: user.id,
  };

  const queryString = window.location.search;
  const searchParams = new URLSearchParams(queryString);
  const postId = searchParams.get("id");

  if (postId) {
    api.post.update(postId, newPost)
      .then(post => {
        console.log(post);
        window.location.assign("home.html");
      });
  } else {
    api.post.create(newPost).then(post => {
      console.log(post);
      window.location.assign("home.html");
    });
  }
}
