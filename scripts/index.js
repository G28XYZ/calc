import theme from "./theme/theme.js";

const displayInput = document.querySelector(".display__input");
const displayOutput = document.querySelector(".display__output");
const buttonsOperator = document.querySelectorAll(".operator");
const buttonsNumber = document.querySelectorAll(".number");

const plus = document.querySelector(".operators__plus");

function toInt(int) {
  return parseFloat(int.replace(",", "."));
}

const actions = {
  multiplication: {
    value: "*",
    label: "multiplication",
    func: (a, b) => toInt(a) * toInt(b),
  },
  division: {
    value: "/",
    label: "division",
    func: (a, b) => toInt(a) / toInt(b),
  },
  addition: {
    value: "+",
    label: "addition",
    func: (a, b) => toInt(a) + toInt(b),
  },
  subtraction: {
    value: "-",
    label: "subtraction",
    func: (a, b) => toInt(a) - toInt(b),
  },
};

function calcFunc() {
  const res = parseBrackets(displayOutput.textContent + displayInput.textContent);
  return res.replace(".", ",");
}

function parseBrackets(str) {
  const out = str.match(/\((.*)\)/);
  if (out) {
    const expResult = parseBrackets(out[1]);
    str = str.replace(out[0], expResult);
    return calcExpr(str);
  } else {
    return calcExpr(str);
  }
}

function calcExpr(str) {
  let res;
  Object.keys(actions).map(function (type) {
    res = parseExpr(str, actions[type]);
    if (res) {
      str = str.replace(res.str, res.value.toString());
      str = calcExpr(str);
    }
  });
  return str;
}

function parseExpr(str, action) {
  // поиск в строке вхождений всех чисел
  // с плавающей точкой и без неё
  // вместе с операторами мат. вычислений
  const reg = new RegExp(`(([,.0-9]+)\\s*\\${action.value}\\s*([,.0-9]+))`);
  const out = str.match(reg);
  if (!out) return false;
  const result = {
    str: out[1],
  };
  result.value = action.func(out[2], out[3]);
  return result;
}

let lastNum = "";
let lastOperator = "";
let firstExpression = "";
let isReset = 1;

function addToInput(evt) {
  if (evt.target.textContent === "0" && displayInput.textContent === "0") {
    return;
  }
  if (displayInput.textContent === "0") {
    isReset = 1;
  }
  if (isReset) {
    displayInput.textContent = "";
    isReset = 0;
  }
  displayInput.textContent += evt.target.textContent;
}

function addToOutput(evt) {
  isReset = 1;
  lastOperator = evt.target.textContent;
  if (displayOutput.textContent === "") {
    displayOutput.textContent = displayInput.textContent + evt.target.textContent;
    return;
  }
  displayOutput.textContent += displayInput.textContent + evt.target.textContent;
}

function equal(evt) {
  displayInput.textContent = calcFunc();
  displayOutput.textContent = "";
}

function changeOperator(evt) {
  displayOutput.textContent =
    displayOutput.textContent.substring(0, displayOutput.textContent.length - 1) +
    evt.target.textContent;
  lastOperator = evt.target.textContent;
}

function operatorAction(evt) {
  // попадёт в условие если
  // предыдущим действием
  // была нажата кнопка с оператором
  if (isReset) {
    // меняет крайний оператор в выражении если был выбран другой
    changeOperator(evt);
    return;
  }
  addToOutput(evt);
}

function deleteOneChar() {
  if (displayInput.textContent.length > 1) {
    displayInput.textContent = displayInput.textContent.substring(
      0,
      displayInput.textContent.length - 1
    );
    if (displayInput.textContent === "-") {
      displayInput.textContent = "0";
    }
  } else {
    displayInput.textContent = "0";
  }
}

function deleteAllString() {
  displayInput.textContent = "0";
}

function reset() {
  displayInput.textContent = "0";
  displayOutput.textContent = "";
}

function plus_minus() {
  if (displayInput.textContent !== "0") {
    displayInput.textContent = parseInt(displayInput.textContent) * -1;
  }
}

function addComma(evt) {
  if (displayInput.textContent.includes(",")) {
    return;
  } else {
    displayInput.textContent += ",";
  }
}

function reciproc() {
  displayInput.textContent = 1 / parseInt(displayInput.textContent);
}

function sqrt() {
  displayInput.textContent = Math.sqrt(displayInput.textContent);
}

function percent() {
  if (displayOutput.textContent === "") {
    displayInput.textContent = 0;
  } else {
    displayInput.textContent =
      (parseBrackets(displayOutput.textContent.replace(",", ".") + 0) / 100) *
      displayInput.textContent;
  }
}

for (let operator of buttonsOperator) {
  if (operator.textContent === "=") {
    operator.addEventListener("click", equal);
    continue;
  }

  if (operator.textContent === "⟵") {
    operator.addEventListener("click", deleteOneChar);
    continue;
  }
  if (operator.textContent === "ce") {
    operator.addEventListener("click", deleteAllString);
    continue;
  }
  if (operator.textContent === "c") {
    operator.addEventListener("click", reset);
    continue;
  }
  if (operator.textContent === "±") {
    operator.addEventListener("click", plus_minus);
    continue;
  }
  if (operator.textContent === "1/x") {
    operator.addEventListener("click", reciproc);
    continue;
  }
  if (operator.textContent === "√") {
    operator.addEventListener("click", sqrt);
    continue;
  }
  if (operator.textContent === "%") {
    operator.addEventListener("click", percent);
    continue;
  }
  operator.addEventListener("click", operatorAction);
}

for (let button of buttonsNumber) {
  if (button.textContent === ",") {
    button.addEventListener("click", addComma);
    continue;
  }
  button.addEventListener("click", addToInput);
}
