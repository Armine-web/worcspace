function createBlocLayout(){
    const container = UI.createElement("div", { class: "container-root" }, [
        UI.createElement("header", { class: "header" }, [
            UI.createElement("a", { href: "./home.html" }, "Home"),
            UI.createElement("a", { href: "./registration.html" }, "Registration"),
            UI.createElement("a",{href: "./index.html"}, "Log In")
          ]),
        UI.createElement("div", {class: "workspace workspace__post"}, [
            UI.createElement("div", {class: "workspace__post-blogger"}, [
                UI.createElement("div", {class: "sidebar__blogger-item workspace__post-blogger-item"}, [
                    UI.createElement("img", {src: "https://www.w3schools.com/howto/img_avatar2.png", class: "sidebar__avatar"}),
                        UI.createElement("span", {class: "workspace__post-author"}, "name surname")
                        ]),
                        UI.createElement("a", {class: "workspace__post-button", href:"./createpost.html"}, "Create New Post" )  
                        ]),

                            UI.createElement("div", { class: "blog-post workspace__post-post" }, [
                              UI.createElement("section", { class: "blog-post__cards" }, null)  
                            ]),
                            UI.createElement("section", { class: "workspace__footer workspace__post-footer" }, "section")
                          ]),
                         
    ])

    UI.render(container, document.body);
}


createBlocLayout()