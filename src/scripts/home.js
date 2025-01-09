import { api } from './apis/api.js';
import { isUserLogin } from './utils/is-user-login.js'

const bloggers = [];

const state = {
  posts: [],
};

function getRandomAvatar(gender) {
  const avatars = [
    "https://www.w3schools.com/howto/img_avatar.png",
    "https://www.w3schools.com/w3images/avatar2.png",
    "https://www.w3schools.com/w3images/avatar5.png",
    "https://www.w3schools.com/w3images/avatar6.png",
    "https://www.w3schools.com/howto/img_avatar2.png",
  ];

  const randomIndex = Math.floor(Math.random() * avatars.length);

  return avatars[randomIndex];
}

const createNewPost = () => {
  window.location.assign("new-post.html");
};

const createHomeLayout = function () {
  const createNewPostButton =  UI.createElement(
    "button",
    { class: "panel-create-post" },
    "Create New Post"
  )

  createNewPostButton.addEventListener("click", createNewPost);


  const container = UI.createElement("div", { class: "container-root" }, [
    UI.createElement(
      "header",
      {
        class: "header",
      },
      [
        UI.createElement("a", { href: "index.html" }, "Log In"),
        UI.createElement("a", { href: "registration.html" }, "Sign Up"),
      ]
    ),
    UI.createElement("main", { class: "main-section" }, [
      createSidebar(bloggers),
      UI.createElement("div", { class: "section" }, [
        UI.createElement(
          "section",
          { class: "panel" },
          createNewPostButton
        ),
        createSection(),
        createFooter(),
      ]),
    ]),
  ]);

  UI.render(container, document.querySelector("body"));
};

function createFooter() {
  return UI.createElement("section", { class: "footer" }, Date().toString());
}


const handleDelete = (id) => {
  api.post.delete(id).then(() => {
    state.posts = state.posts.filter((post) => post.id !== id);

    document.querySelector(".container-root").remove();

    createHomeLayout();
  })
};

const handleEdit = (event, id) => {
 
  event.preventDefault(event);
  const queryParams = new URLSearchParams({
    id: id,
  });
 
  localStorage.setItem('id', id);

  window.location.href = `edit.html?${queryParams.toString()}`;
 
 
};





function createSection() {
  const elements = state.posts.map((post) => {

    const deleteButton = UI.createElement(
      "button",
      { class: "card-button m-r-1" },
      "Delete"
    );

    deleteButton.addEventListener("click", () => {
      handleDelete(post.id);
    });


    const editButton = UI.createElement("button", { class: "card-button" }, "Edit");
editButton.addEventListener("click", () => {
  const queryParams = new URLSearchParams({
    id: post.id, 
  });
  window.location.href = `new-post.html?${queryParams.toString()}`;
});


    const buttonsWrapper = UI.createElement("div", { class: "buttons-wrapper" }, [
      deleteButton,
      editButton
    ]);

    return UI.createElement(
      "div",
      {
        class: "card",
      },
      [
        UI.createElement("div", { class: "card-body" }, [
          UI.createElement("p", { class: "card-header" }, post.title),
          UI.createElement('div', { class: "card-content" }, [
            UI.createElement("img", {
              src: post.img,
              class: "card-img-top",
              alt: "Post Image",
            }),
            UI.createElement("p", { class: "card-text" }, post.story)
          ]),
          buttonsWrapper 
        ]),
      ]
    );
  });

  const section = UI.createElement("section", { class: "box" }, elements);

  return section;
}

function createSidebar() {
  api.user.getUser().then((bloggers) => {
    bloggers.forEach((blogger) => {
      const element = UI.createElement(
        "div",
        { class: "card m-b-1" },
        [
          UI.createElement("img", { src: getRandomAvatar(), alt: "Avatar" }),
          UI.createElement(
            "p",
            { class: "sidebar-text" },
            `${blogger.firstName} ${blogger.lastName}`
          ),
        ]
      );
      document.querySelector("#bloggers").appendChild(element);
    });
  });

  return UI.createElement("sidebar", { id: "bloggers", class: "sidebar" }, []);
}

const initApplicants = () => {
  try {
    if (!isUserLogin()) {
      window.location.assign('index.html');
      return
    }

    api.post.getPosts().then(data => {
      state.posts = data;
      createHomeLayout();
    })
  } catch (error) {
    state.posts = [];
  }
};

initApplicants();

setInterval(() => {
  if (document.querySelector("div.section")) {
    document
      .querySelector("div.section")
      .removeChild(document.querySelector("section.footer"));
  }
  UI.render(createFooter(), document.querySelector("div.section"));
}, 1000);
