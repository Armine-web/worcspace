function createContainer(){
    const container = UI.createElement('div', {class: "container-root"},[
        UI.createElement('div', {class: "header"}, [
            UI.createElement("a", {href: "./home.html"}, "Home")
        ]),

        UI.createElement("div", {class: "form-wrapper"}, [
            UI.createElement("div", {class: "form-container"}, [
                UI.createElement("form", {}, [
                    UI.createElement("input", {type: "text", placeholder: "Username"},),
                    UI.createElement("input", {type: "password", placeholder: "Password"},),
                    UI.createElement("button", {type: "submit"}, "Login"),
                ]),

            ])
        ])
    ]);
    UI.render(container, document.body);
}

createContainer();