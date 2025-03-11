const displayBoard = document.getElementById("display");
const allClear = document.getElementById("allClear");
const clear = document.getElementById("clear");
const changeSign = document.getElementById("changeSign");
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
    operand2 = "";
    operator = "";
    btnClicked = false;
});

// Add event listeners to digits
for (let digit of digits) {
    digit.addEventListener("click", display);
}

// Add event listeners to operators
for (let op of operators) {
    op.addEventListener("click", assign);
}

// Add event listener to equal button
equal.addEventListener("click", operate);

function operate() {
    if (operand1 !== "" && operator !== "") {

        if(operand2 === ""){
            operand2 = "0";
        }
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
                result = num2 !== 0 ? num1 / num2 : "Error"; // Prevent division by zero
                break;
            default:
                break;
        }

        displayBoard.innerText = result;
        operand1 = result; 
        console.log("op1 : " + operand1);
    }
}

function assign() {

    if (operand1 === "") {
        operand1 = displayBoard.innerText;
        console.log("op1 : " + operand1);
    }

    if(operand2 !== ""){
        operate();
    }

    operator = this.innerText;
    console.log("Operator: " + operator);
    btnClicked = true;

}

function display() {
    if (displayBoard.innerText === "0" || btnClicked) {
        displayBoard.innerText = this.innerText;
        btnClicked = false;
    } else {
        displayBoard.innerText += this.innerText;
    }

    if (operator !== "") {
        operand2 = displayBoard.innerText;
        console.log("op2 : " + operand2);
    }
}
