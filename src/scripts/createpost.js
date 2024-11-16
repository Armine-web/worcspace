function createPostLayout() {
  const container = UI.createElement("div", { class: "container-root" }, [
      UI.createElement("header", { class: "header" }, [
          UI.createElement("a", { href: "./home.html" }, "Home"),
      ]),
      UI.createElement("div", { class: "form-wrapper" }, [
          UI.createElement("div", { class: "form-container post-form" }, [
              UI.createElement("form", { class: "login-form", id: "createPostForm" }, [
                  UI.createElement("input", { id: "postTitle", placeholder: "Title" }),
                  UI.createElement("textarea", { id: "postStory", placeholder: "Story (the main content of the post)" }),
                  UI.createElement("input", { id: "imageLink", type: "text", placeholder: "Image Link" }),
                  UI.createElement("button", { type: "submit" }, "Create"),
              ]),
          ]),
      ]),
  ]);

  UI.render(container, document.body);

  const form = document.getElementById('createPostForm');
  form.addEventListener('submit', function (event) {
      event.preventDefault();
      const title = document.getElementById('postTitle').value;
      const story = document.getElementById('postStory').value;
      const imgLink = document.getElementById('imageLink').value;

      const existingError = document.getElementById('error-message');
      if (existingError) {
          existingError.remove();
      }
  
      if (!title || !story || !imgLink) {
          const errorMessage = document.createElement('p');
          errorMessage.id = 'error-message';
          errorMessage.textContent = "All fields are required!";
          errorMessage.style.color = 'red';
          errorMessage.style.margin = '15px';
  

          form.appendChild(errorMessage);
          return; 
      }

      const newPost = {
          id: Date.now(),
          title,
          story,
          authorName: "name name",
          img: imgLink,
      };
      
      let posts = JSON.parse(localStorage.getItem('posts')) || [];
      posts.unshift(newPost);
      localStorage.setItem('posts', JSON.stringify(posts));

      window.location.href = 'home.html';
  });
}

createPostLayout();
