import { api } from './apis/api.js';
import { Storage } from './utils/storage.js';

function createForm() {
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
          placeholder: "Enter post title",
        }),
        UI.createElement("textarea", {
          id: "postStory",
          name: "postStory",
          placeholder: "Enter your story here",
          rows: "5",
          cols: "50",
        }),
        UI.createElement("input", {
          id: "file-upload",
          type: "file",
        }),
        UI.createElement("div", { class: "" }, [
          UI.createElement("button", { id: "create-new-post" }, "Create Post"),
        ]),
      ]),
    ]),
  ]);

  UI.render(container, document.body);

  const createPostForm = document.getElementById("create-new-post");
  createPostForm.addEventListener("click", createPostHandler);
}

function loadPostForEditing() {
  const postId = localStorage.getItem('editPostId');

  if (postId) {
    api.post.getPostById(postId).then(post => {
      if (post) {
        document.getElementById("postTitle").value = post.title;
        document.getElementById("postStory").value = post.story;
        document.getElementById("postImage").value = post.img || "";
      }
    }).catch(err => {
      console.error("Error loading post:", err);
      alert("Post not found!");
    });
  } else {
    console.log("No post ID found in localStorage");
  }
}

function init() {
  createForm();
  loadPostForEditing();
}

init();

async function createPostHandler(event) {
  event.preventDefault();

  const title = document.getElementById("postTitle").value.trim();
  const story = document.getElementById("postStory").value.trim();
  const fileUpload = document.getElementById("file-upload");

  if (!title || !story || (fileUpload && !fileUpload.files.length)) {
    alert("Please fill in all fields.");
    return;
  }

  const uploadedFile = fileUpload.files.length > 0 ? await api.fileUpload.upload(fileUpload.files[0]) : null;

  const user = Storage.getItem('user');

  const newPost = {
    title,
    story,
    authorName: user.username,
    img: uploadedFile ? uploadedFile.url : '', 
    userId: user.id,
  };

  const postId = localStorage.getItem('editPostId');

  if (postId) {
    api.post.update(postId, newPost).then((updatedPost) => {
      console.log(updatedPost);
      alert('Post updated successfully!');
      window.location.assign("home.html");
    });
  } else {
    api.post.create(newPost).then((createdPost) => {
      console.log(createdPost);
      alert('New post created successfully!');
      window.location.assign("home.html");
    });
  }
}
