const displayBoard = document.getElementById("display");
const allClear = document.getElementById("allClear");
const clear = document.getElementById("clear");
const toggleSign = document.getElementById("toggleSign");
const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const decimal = document.querySelector("#decimal");
const equal = document.getElementById("equal");

let operand1 = "";
let operand2 = "";
let operator = "";
let btnClicked = false;     // Tracks if an operator or equal button was last clicked
let activeOperator = null;  // Track the currently active operator button

// Function to update the display
function updateDisplay(value) {
    displayBoard.innerText = value;
}

// Function to reset calculator
function resetCalculator() {
    operand1 = "";
    operand2 = "";
    operator = "";
    btnClicked = false;
    updateDisplay(0);
    removeActiveOperator();
}

// Function to remove the active class from the operator button
function removeActiveOperator() {
    if (activeOperator) {
        activeOperator.classList.remove("active");
        activeOperator = null;
    }
}

// Event listener for all-clear button
allClear.addEventListener("click", resetCalculator);

// Event listener for clear button 
clear.addEventListener("click", () => {
    if (operator && !operand2) {
        operator = "";
        removeActiveOperator();
    } else if(displayBoard.innerText == "Error"){
        updateDisplay(0);
    }else {
        if(displayBoard.innerText < 0){
            let val = -displayBoard.innerText;
            val = Math.floor(val / 10) || 0;
            updateDisplay(-val);
        }else{
            updateDisplay(displayBoard.innerText.slice(0, -1) || "0");
        }
        syncOperand();
    }
});

// Add event listener to toggle sign button 
toggleSign.addEventListener("click", () => {
    if (operator && !operand2) return;
    updateDisplay(-displayBoard.innerText);
    syncOperand();
});

// Synchronizes operand with the display if an operator is selected
function syncOperand() {
    if (operand1 && operator) {
        operand2 = displayBoard.innerText;
    } else if (!operator) {
        operand1 = displayBoard.innerText;
    }
}

// Event listeners for operators
operators.forEach(op => op.addEventListener("click", assign));

// Assign operator and set active class
function assign() {

    if (!operand1) operand1 = displayBoard.innerText;
    if (operand2) operate();

    operator = this.innerText;
    btnClicked = true;

    removeActiveOperator();
    this.classList.add("active");
    activeOperator = this;
}

// Event listeners for digits
digits.forEach(digit => digit.addEventListener("click", display));

// Function to handle digit button clicks
function display() {
    if (btnClicked) {
        if (!operator)   operand1 = "";
        updateDisplay(this.innerText);
        btnClicked = false;
    } else {
       updateDisplay(displayBoard.innerText === "0" ? this.innerText : displayBoard.innerText + this.innerText);
    }

    if (operator) {
        operand2 = operand2 === "" ? this.innerText : operand2 + this.innerText;
        removeActiveOperator();
    }
}

// Event listeners for decimal button
decimal.addEventListener("click", () => {
    if (btnClicked) {
        if (!displayBoard.innerText.includes(".")) {
            displayBoard.innerText += ".";
        }
        btnClicked = false;
    } else if (!displayBoard.innerText.includes(".")) {
        displayBoard.innerText += ".";
    }
    syncOperand();
});

// Event listener for equal button
equal.addEventListener("click", operate);

// Function to perform the calculation
function operate() {
    removeActiveOperator();

    if (operand1 && operator) {
        if (!operand2) operand2 = "0";

        let num1 = parseFloat(operand1);
        let num2 = parseFloat(operand2);
        let result = 0;

        switch (operator) {
            case "+":   result = num1 + num2;  break;
            case "-":   result = num1 - num2;  break;
            case "*":   result = num1 * num2;  break;
            case "/":   result = num2 !== 0 ? num1 / num2 : "Error";    break;
            default:    break;
        }

        updateDisplay(result);
        operand1 = result;
        operand2 = "";
        operator = "";
        btnClicked = true;
    }
}