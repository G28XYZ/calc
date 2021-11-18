import theme from "./theme/theme.js";

const displayInput = document.querySelector(".display__input");
const displayOutput = document.querySelector(".display__output");
const buttonsOperator = document.querySelectorAll(".operator");
const buttonsNumber = document.querySelectorAll(".number");

const plus = document.querySelector(".operators__plus");

let result = 0;
let isReset = 1;
let expression = {};

function addToInput(evt) {
  if (isReset) {
    displayInput.textContent = "";
    isReset = 0;
  }
  displayInput.textContent += evt.target.textContent;
  addToOutput(evt);
}

function addToOutput(evt) {
  if (displayOutput.textContent === "") {
    displayOutput.textContent = displayInput.textContent;
    return;
  }
  displayOutput.textContent +=
    displayOutput.textContent[displayOutput.textContent.length - 1] === "+"
      ? displayInput.textContent
      : expression.char;
}

for (let button of buttonsNumber) {
  button.addEventListener("click", addToInput);
}

function equal(evt) {
  expression.func(evt);

  displayOutput.textContent = result;
  return;
}

function sum(evt) {
  console.log(parseInt(displayInput.textContent));
  result += parseInt(displayInput.textContent);
  isReset = 1;
  expression.func = sum;
  expression.char = "+";
  addToOutput(evt);
}

for (let operator of buttonsOperator) {
  if (operator.textContent === "=") {
    operator.addEventListener("click", equal);
    continue;
  }
  if (operator.textContent === "+") {
    operator.addEventListener("click", sum);
    continue;
  }
  operator.addEventListener("click", addToOutput);
}
