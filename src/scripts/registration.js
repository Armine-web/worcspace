function createRegistrationLayout() {
    const container = UI.createElement("div", { class: "container-root" }, [
      UI.createElement( "header", { class: "header" }, [
        UI.createElement("a", { href: "./home.html" }, "Home"),
        UI.createElement("a", { href: "./index.html" }, "Log In")]),
            UI.createElement("div", { class: "form-wrapper" },[
                UI.createElement("div", { class: "form-container" }, [
                    UI.createElement("form", { class: "login-form" }, [
                        UI.createElement("input", {placeholder: "First Name"}),
                        UI.createElement("input", {placeholder: "Last Name"}),
                        UI.createElement("select", {}, [
                            UI.createElement("option", {}, "City"),
                        ]),
                        UI.createElement("div", { class: "inputs-wrapper" }, [
                            UI.createElement("div", { class: "inputs" },[
                                UI.createElement("input", { type: "radio", id: "male" },),
                                UI.createElement("label", { for: "male"}, "Male")
                            ]),
                            UI.createElement("div", { class: "inputs" },[
                                UI.createElement("input", { type: "radio", id: "female" },),
                                UI.createElement("label", { for: "female"}, "Female")
                            ])
                        ]),
                        UI.createElement("div", { class: "button-wrapper" },[
                            UI.createElement("input", { type: "checkbox", id: "send" },),
                            UI.createElement("label", { for: "send"}, "Send me Email"),
                            UI.createElement("button", { class: "submit-button" }, "Submit")
                        ])

                    ])
                    
                ])
            ])

    ]);
    UI.render(container, document.body);
  }

  createRegistrationLayout();
  