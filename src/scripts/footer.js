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