import { api } from './apis/api.js';
import { isUserLogin } from './utils/is-user-login.js'
import { Storage } from './utils/storage.js';



const state = {
  posts: [],
  bloggers: []
};



const createNewPost = () => {
  window.location.assign("new-post.html");
};

const createHomeLayout = function () {
  const createNewPostButton = UI.createElement(
    "button",
    { class: "panel-create-post" },
    "Create New Post"
  );

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
      createSidebar(state.bloggers), 
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

const handleEdit = (id) => {
  const queryParams = new URLSearchParams({
    id: id,
  });

  window.location.href = `post-update.html?${queryParams.toString()}`;
};

function createSection() {
  const elements = state.posts.map((post) => {

    const user = Storage.getItem('user');
    const isAuthor = post.userId === user.id;
    console.log(user && post.userId === user.id);
    
    
  
    const deleteButton = UI.createElement(
      "button",
      { class: "card-button m-r-1", style: isAuthor ? "" : "display: none" },
      "Delete"
    );

    deleteButton.addEventListener("click", () => {
      handleDelete(post.id);
    });

    const editButton = UI.createElement(
      "button",
      { class: "card-button edit", style: isAuthor ? "" : "display: none"},
      "Edit"
    );

    editButton.addEventListener("click", () => {
      handleEdit(post.id);
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

function createSidebar(bloggers) {
  const elements = bloggers.map((blogger) => {
    const user = Storage.getItem('user');
    const isAuthor = blogger.userId === user.id;
    console.log(user && blogger.userId === user.id);

    return UI.createElement(
      "div",
      { class: "card m-b-1 w-125 h-125 p-2" },
      [
        UI.createElement("img", { style: "width: 100%; height: 100%; border-radius: 50%;",
          class: "card-img-top",
          alt: "Blogger Image",
          src: blogger.avatar
                                
        }),
        UI.createElement(
          "p",
          { class: "sidebar-text" },
          `${blogger.firstName} ${blogger.lastName}`
        ),
      ]
    );
  });

  return UI.createElement("sidebar", { id: "bloggers", class: "sidebar" }, elements);
}


const initApplicants = () => {
  try {
    if (!isUserLogin()) {
      window.location.assign('index.html');
      return;
    }


    Promise.all([
      api.post.getPosts(),
      api.user.getUser(),
    ])
      .then(([postsData, bloggersData]) => {
        state.posts = postsData;
        state.bloggers = bloggersData;
        createHomeLayout();
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        state.posts = [];
        state.bloggers = [];
        createHomeLayout(); 
      });
  } catch (error) {
    console.error('Unexpected error:', error);
    state.posts = [];
    state.bloggers = [];
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
