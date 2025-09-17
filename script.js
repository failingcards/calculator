let currentNum = "";
let previousNum = "";
let operator = "";
let justCalculated = false;

const currentDisplayNumber = document.querySelector(".currentNumber");
const previousDisplayNumber = document.querySelector(".previousNumber");

window.addEventListener("keydown", handleKeyPress)

const equal = document.querySelector(".equal");
equal.addEventListener("click", () => {
    if (currentNum !== "" && previousNum !== "") {
        calculate();
        justCalculated = true;
    }
});

const decimal = document.querySelector(".decimal");
decimal.addEventListener("click", () => {
    addDecimal();
});

const clear = document.querySelector(".clear");
clear.addEventListener("click", clearCalculator);

const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        handleNumber(e.target.textContent);
    });
});

const operators = document.querySelectorAll(".operator");
operators.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        handleOperator(e.target.textContent);
    });
});

function handleNumber(number) {
    if (justCalculated) {
        currentNum = "";
        previousNum = "";
        operator = "";
        justCalculated = false;
    }

    if (currentNum.length <= 11) {
        currentNum += number;
        currentDisplayNumber.textContent = currentNum;
    }
}

function handleOperator(op) {
    if (previousNum === "") {
        previousNum = currentNum;
        operatorCheck(op);
    } else if (currentNum === "") {
        operatorCheck(op);
    } else {
        calculate();
        operator = op;
        previousDisplayNumber.textContent = previousNum + " " + operator;
        currentNum = "";
    }
    justCalculated = false;
}

function operatorCheck(op) {
    operator = op;
    previousDisplayNumber.textContent = previousNum + " " + operator;
    currentDisplayNumber.textContent = "";
    currentNum = "";
}

function calculate() {
    previousNum = Number(previousNum);
    currentNum = Number(currentNum);

    if (operator === "+") {
        previousNum += currentNum;
    } else if (operator === "-") {
        previousNum -= currentNum;
    } else if (operator === "x") {
        previousNum *= currentNum;
    } else if (operator === "/") {
        if (currentNum === 0) {
            previousNum = "Error";
            displayResults();
            return;
        }
        previousNum /= currentNum;
    }

    previousNum = roundNumber(previousNum);
    displayResults();
}

function roundNumber(num) {
    return Math.round(num * 100000) / 100000;
}

function displayResults() {
    const resultStr = previousNum.toString();
    if (resultStr.length <= 11) {
        currentDisplayNumber.textContent = resultStr;
    } else {
        currentDisplayNumber.textContent = resultStr.slice(0, 11) + "...";
    }
    previousDisplayNumber.textContent = "";
    operator = "";
    currentNum = "";
}

function clearCalculator() {
    currentNum = "";
    previousNum = "";
    operator = "";
    justCalculated = false;
    currentDisplayNumber.textContent = "";
    previousDisplayNumber.textContent = "";
}

function addDecimal() {
    if (justCalculated) { 
        currentNum = "0";
        justCalculated = false;
    }
    if (!currentNum.includes(".")) {
        currentNum += ".";
        currentDisplayNumber.textContent = currentNum;
    }
}

function handleKeyPress(e) {
    e.preventDefault();
    if (e.key >= 0 && e.key <=9) {
        handleNumber(e.key)
    }
    if (e.key === "Enter" || e.key === "=" && currentNum != "" && previousNum != "") {
        calculate();
    }
    if (e.key === "+" || e.key === "-" || e.key === "/") {
        handleOperator(e.key)
    }
    if (e.key === "*") {
        handleOperator("x");
    }
    if (e.key === ".") {
        addDecimal();
    }
}