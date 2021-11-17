export default (function theme() {
  const theme = "classic";

  const selectors = {
    content: "content",
    display: "display",
    operator: "operator",
    number: "number",
  };

  function addClass(elem, selector) {
    elem.classList.add(selector);
  }

  for (let selector of Object.keys(selectors)) {
    let elems = document.querySelectorAll(`.${selector}`);
    for (let elem of elems) {
      addClass(elem, `${selector}_${theme}`);
    }
  }
})();
