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

// Function to remove the active class from the operator button
function removeActiveOperator() {
    if (activeOperator) {
        activeOperator.classList.remove("active");
        activeOperator = null;
    }
}

// Event listener for all-clear button
allClear.addEventListener("click", () => {
    displayBoard.innerText = 0;
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
    } else if(displayBoard.innerText == "Error"){
       displayBoard.innerText = 0;
    }else {
        if(displayBoard.innerText < 0){
            let val = -displayBoard.innerText;
            val = Math.floor(val / 10) || 0;
            displayBoard.innerText = -val;
        }else{
            displayBoard.innerText = displayBoard.innerText.slice(0, -1) || "0";
        }
        syncOperand();
    }
});

// Add event listener to toggle sign button 
toggleSign.addEventListener("click", () => {
    if (operator && !operand2) return;
    displayBoard.innerText = -displayBoard.innerText;
    syncOperand();
});

// Synchronizes operand with the display if an operator is selected
function syncOperand() {
    if (operand1 && operator) {
        operand2 = displayBoard.innerText;
        console.log("op2 " + operand2);
    } else if (!operator) {
        operand1 = displayBoard.innerText;
        console.log("op1 " + operand1);
    }
}

// Event listeners for digits
digits.forEach(digit => digit.addEventListener("click", display));

// Event listeners for operators
operators.forEach(op => op.addEventListener("click", assign));

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
    if(operand1 && operator)    syncOperand();
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
        
        displayBoard.innerText = result;
        console.log("res:" +result);
        operand1 = result;
        console.log("op1:" +operand1);
        operand2 = "";
        console.log("op2:" +operand2);
        operator = "";
        console.log("op:" + operator);
        btnClicked = true;
    }
}

// Assign operator and set active class
function assign() {

    if (!operand1){
        operand1 = displayBoard.innerText;
        console.log("op1:"+ operand1);
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
        if (!operator) {
            operand1 = "";
            console.log("op1 :" + operand1);
        }
        displayBoard.innerText = this.innerText;
        btnClicked = false;
    } else {
        displayBoard.innerText = displayBoard.innerText === "0" ? this.innerText : displayBoard.innerText + this.innerText;
    }

    if (operator) {
        operand2 = operand2 === "" ? this.innerText : operand2 + this.innerText;
        console.log("op2:" + operand2);
        removeActiveOperator();
    }
}