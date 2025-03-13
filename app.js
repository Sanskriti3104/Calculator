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
let btnClicked = false;

// Add event listener to all clear button
allClear.addEventListener("click", function () {
    displayBoard.innerText = 0;
    operand1 = "";
    operator = ""
    operand2 = "";
    btnClicked = false;
});

// Add event listener to clear button 
clear.addEventListener("click", () => {
    if (operator && !operand2) {
        operator = "";
    } else {
        displayBoard.innerText = displayBoard.innerText.slice(0, -1) || "0";
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
    } else if (operator === "") {
        operand1 = displayBoard.innerText;
    }
}

// Add event listeners to digits
for (let digit of digits) {
    digit.addEventListener("click", display);
}

// Add event listeners to operators
for (let op of operators) {
    op.addEventListener("click", assign);
}

// Add event listeners to decimal button
decimal.addEventListener("click", () => {
    if (btnClicked) {
        // If user clicks "." after "=", append decimal to the result instead of resetting
        if (!displayBoard.innerText.includes(".")) {
            displayBoard.innerText += ".";
        }
        btnClicked = false;
    } else if (!displayBoard.innerText.includes(".")) {
        displayBoard.innerText += ".";
    }
    syncOperand();
});


// Add event listener to equal button
equal.addEventListener("click", operate);

function operate() {

    if (operand1 && operator) {

        if (!operand2) operand2 = "0";

        let num1 = parseFloat(operand1);
        let num2 = parseFloat(operand2);
        let result = 0;

        switch (operator) {
            case "+":
                result = num1 + num2;
                break;
            case "-":
                result = num1 - num2;
                break;
            case "*":
                result = num1 * num2;
                break;
            case "/":
                result = num2 !== 0 ? num1 / num2 : "Error";
                break;
            default:
                break;
        }

        displayBoard.innerText = result;
        operand1 = result;
        operator = "";
        operand2 = "";
        btnClicked = true;
    }
}

function assign() {

    if (operand1 === "") operand1 = displayBoard.innerText;

    if (operand2 !== "") operate();

    operator = this.innerText;
    btnClicked = true;

}

function display() {
    if (btnClicked) {
        // If '=' was pressed and a digit is clicked, reset only if no operator is active
        if (operator === "") {
            operand1 = "";
        }
        displayBoard.innerText = this.innerText;
        btnClicked = false;
    } else {
        // Append digits normally
        displayBoard.innerText = displayBoard.innerText === "0" ? this.innerText : displayBoard.innerText + this.innerText;
    }

    // If an operator is active, update operand2 instead of replacing it
    if (operator !== "") {
        operand2 = operand2 === "" ? this.innerText : operand2 + this.innerText;
        console.log("op2 : " + operand2);
    }
}