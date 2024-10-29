function createHomeLayout() {
  const container = UI.createElement("div", { class: "container-root" }, [
    UI.createElement("header", { class: "header" }, [
      UI.createElement("a", { href: "./index.html" }, "Log In"),
      UI.createElement("a", { href: "./registration.html" }, "Registration")
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
}

function createFooter() {
  return UI.createElement(
    "footer",
    { class: "footer", id: "time-footer" },
    Date().toString()
  );
}

setInterval(() => {
  const footer = document.getElementById("time-footer");

  if (footer) {
    footer.remove();
  }

  const newFooter = createFooter();
  UI.render(newFooter, document.body);
}, 1000);

createHomeLayout();
