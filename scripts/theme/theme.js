export default (function theme() {
  const activeTheme = document.querySelector(".tabs__view");
  const themes = {
    Классическая: "classic",
    Андроид: "android",
  };

  let theme = themes[activeTheme.value];
  let oldTheme = theme;

  function changeTheme() {
    theme = themes[activeTheme.value];
    for (let selector of Object.keys(selectors)) {
      let elems = document.querySelectorAll(`.${selector}`);
      for (let elem of elems) {
        removeClass(elem, `${selector}_${oldTheme}`);
        addClass(elem, `${selector}_${theme}`);
      }
    }
    oldTheme = theme;
  }

  const selectors = {
    content: "content",
    display: "display",
    operator: "operator",
    number: "number",
    calc: "calc",
  };

  function addClass(elem, selector) {
    elem.classList.add(selector);
  }

  function removeClass(elem, selector) {
    elem.classList.remove(selector);
  }

  changeTheme();
  activeTheme.addEventListener("change", changeTheme);
})();
