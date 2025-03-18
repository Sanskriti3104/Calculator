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

function updateDisplay(value) {
    if (value.length >= 16) return;
    if (Math.abs(value) >= 1e15 || (Math.abs(value) < 1e-5 && value != 0)) {
        value = parseFloat(value).toExponential(5); 
    }
    displayBoard.innerText = value.toString();
    // displayBoard.innerText = value;
}

// Function to remove the active class from the operator button
function removeActiveOperator() {
    if (activeOperator) {
        activeOperator.classList.remove("active");
        activeOperator = null;
    }
}

function fixPrecision(value, precision = 5) {
    if (value === 0) return "0";
    // return Math.abs(value) < 1e-5
    //     ? value.toExponential(precision)  // Use scientific notation for very small numbers
    //     : parseFloat(value.toFixed(precision));  // Convert to fixed decimal places
    // Use scientific notation for very large or very small numbers
    if (Math.abs(value) >= 1e16 || Math.abs(value) < 1e-5) {
        return value.toExponential(precision);
    } else {
        // Convert to fixed decimal places for regular numbers
        return parseFloat(value.toFixed(precision)).toString();
    }
}

// Event listener for all-clear button
allClear.addEventListener("click", () => {
    updateDisplay("0");
    operand1 = "";
    console.log("op 1:" + operand1);
    operand2 = "";
    console.log("op 2:" + operand2);
    operator = "";
    console.log("op :" + operator);
    btnClicked = false;
    removeActiveOperator();
});

// Event listener for clear button 
clear.addEventListener("click", () => {
    if (operator && !operand2) {
        operator = "";
        console.log("op :" + operator);
        removeActiveOperator();
    } else if (displayBoard.innerText == "Error") {
        updateDisplay("0");
    } else {
        if (displayBoard.innerText < 0) {
            let val = -displayBoard.innerText;
            val = Math.floor(val / 10) || 0;
            updateDisplay((-val).toString());
        } else {
            updateDisplay(displayBoard.innerText.slice(0, -1) || "0");
        }
        syncOperand();
    }
});

// Add event listener to toggle sign button 
toggleSign.addEventListener("click", () => {
    if (operator && !operand2) return;
    updateDisplay((-displayBoard.innerText).toString());
    syncOperand();
});

// Synchronizes operand with the display if an operator is selected
function syncOperand() {
    if (operand1 && operator) {
        operand2 = displayBoard.innerText;
        console.log("op2 " + operand2);
    } else if (!operator) {
        operand1 = displayBoard.innerText === "0" ? "" : displayBoard.innerText;
        console.log("op1 " + operand1);
    }
}

// Event listeners for digits
digits.forEach(digit => digit.addEventListener("click", display));

// Event listeners for operators
operators.forEach(op => op.addEventListener("click", assign));

// Event listeners for decimal button
decimal.addEventListener("click", () => {
    if (!displayBoard.innerText.includes(".")) {
        updateDisplay(displayBoard.innerText + ".");
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
            case "+": result = fixPrecision(num1 + num2); break;
            case "-": result = fixPrecision(num1 - num2); break;
            case "*": result = fixPrecision(num1 * num2, 5); break;
            case "/": result = num2 !== 0 ? fixPrecision(num1 / num2, 5) : "Error"; break;
            default: break;
        }

        updateDisplay(result.toString());
        console.log("res:" + result);
        operand1 = result;
        console.log("op1:" + operand1);
        operand2 = "";
        console.log("op2:" + operand2);
        operator = "";
        console.log("op:" + operator);
        btnClicked = true;
    }
}

// Assign operator and set active class
function assign() {

    if (!operator) {
        operand1 = displayBoard.innerText;
        console.log("op1:" + operand1);
    }
    if (operand2) operate();

    operator = this.innerText;
    console.log("op:" + operator);
    btnClicked = true;

    removeActiveOperator();
    this.classList.add("active");
    activeOperator = this;
}

// Function to handle digit button clicks
function display() {
    if (btnClicked) {
        updateDisplay(this.innerText);
        btnClicked = false;
    } else {
        if (displayBoard.innerText.length >= 16) return;
        updateDisplay(displayBoard.innerText === "0" ? this.innerText : displayBoard.innerText + this.innerText);
    }
    if (operator) {
        if (operand2.length >= 16) return;
        operand2 = operand2 === "" ? this.innerText : operand2 + this.innerText;
        console.log("op2:" + operand2);
        removeActiveOperator();
    }
}