const buttons = document.querySelectorAll(".btn");
const operators = document.querySelectorAll(".operator");
const topOutput = document.querySelector("#lcdu");
const output = document.querySelector("#lcd");
let operatorIspressed = false;
let isAnswered = false;
//initialize variables
let firstNumber = 0,
  secondNumber = 0,
  result = 0,
  operation = "";
const operatorsList = ["+", "*", "/", "%", "-", "^", "=", "c", "root"];
const getConstraint = ()=> output.value == result
function addListEventListener(elements, handler = () => {}, event = "click") {
  if (!elements) {
    throw Error("no element was added");
    return;
  }
  elements.forEach((elem) => elem.addEventListener(event, handler));
}
function updateTopOutput(value) {
    if(isAnswered){
        topOutput.value += output.value
        return
    }
  if (!getConstraint()) {
    topOutput.value += output.value + value;
  }
}
//setEvent handler
handleButtonClick = function (e) {
  e.preventDefault();
  if (output.value == "0" || operatorIspressed) {
    output.value = e.target.value;
  } else {
    output.value += e.target.value;
  }
  operatorIspressed = false;
};

handleOperatorClick = function (e) {
    e.preventDefault()
    
    operatorIspressed =  true;
    console.log(operatorIspressed)
  if (!operatorsList.includes(e.target.value)) {
    return;
  }
  updateTopOutput(e.target.value);
  if (e.target.value == "=") {
    calculate();
    isAnswered = true;
    return;
  }
  
  if (e.target.value == "c") {
    console.log("hey");
    clear();
    return;
  }

 
  if ((!!firstNumber && !!output.value) && !(output.value == result)) {
    calculate();
    return;
  }

  operation = e.target.value;
  firstNumber = parseInt(document.lcdform.lcds.value);
  
  
};
function calculate() {
  if (!!operation) {
    secondNumber = output.value;
    if(result){
        firstNumber =result;
    }
    result = eval(
      `${parseInt(firstNumber)} ${operation} ${parseInt(secondNumber)}`
    );
    output.value = result;
  }
}
function clear() {
  topOutput.value = "";
  output.value = "0";
  result = 0;
  firstNumber = 0;
  secondNumber = 0;
}
//addEventListener
//FOR OPERATORS
addListEventListener(operators, handleOperatorClick);
//FOR BUTTONS
addListEventListener(buttons, handleButtonClick);
