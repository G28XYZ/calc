import theme from "./theme/theme.js";

const displayInput = document.querySelector(".display__input");
const displayOutput = document.querySelector(".display__output");
const buttonsOperator = document.querySelectorAll(".operator");
const buttonsNumber = document.querySelectorAll(".number");

const plus = document.querySelector(".operators__plus");

function addToInput(evt) {
  if (displayInput.textContent === "0") {
    displayInput.textContent = "";
  }
  displayInput.textContent += evt.target.textContent;
}

function addToOutput(evt) {
  displayOutput.textContent +=
    displayInput.textContent + evt.target.textContent;
}

for (let button of buttonsNumber) {
  button.addEventListener("click", addToInput);
}

for (let operator of buttonsOperator) {
  operator.addEventListener("click", addToOutput);
}
