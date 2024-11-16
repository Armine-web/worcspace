function createHomeLayout() {
  const container = UI.createElement("div", { class: "container-root" }, [
      UI.createElement("header", { class: "header" }, [
          UI.createElement("a", { href: "./index.html" }, "Log In"),
          UI.createElement("a", { href: "./registration.html" }, "Registration"),
          UI.createElement("a", { href: "./createblog.html" }, "Create Blog")
      ]),
      UI.createElement("div", { class: "workspace" }, [
          UI.createElement("main", { class: "workspace__main" }, [
              UI.createElement("div", { class: "blog-post" }, [
                  UI.createElement("section", { class: "blog-post__cards" }, null)  
              ]),
              UI.createElement("section", { class: "workspace__footer" }, "section")
          ]),
          UI.createElement("nav", { class: "sidebar" }, [
              UI.createElement("ul", { class: "sidebar__blogger-list" }, null)
          ])
      ]),
      createFooter()
  ]);

  UI.render(container, document.body);


  
  const posts = JSON.parse(localStorage.getItem('posts')) || [];

  const postContainer = document.querySelector('.blog-post__cards');
  posts.forEach(post => {
      const postCard = document.createElement('div');
      postCard.classList.add('blog-post__card');
      postCard.innerHTML = `
          <div class="blog-post__header">
              <h3>${post.title}</h3>  
              <p><strong>Author: ${post.authorName}</strong></p>
          </div>
          <div class="blog-post__content">
              <img class="blog-post__content-img" src="${post.img}" alt="${post.title}">
              <p>${post.story}</p>
          </div>   
      `;
      postContainer.appendChild(postCard);
  });
}

createHomeLayout();
