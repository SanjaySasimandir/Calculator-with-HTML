var inputBox = document.querySelector("input"); // Selects the input field
inputBox.value = ""; // Clears the field when page is loaded

var operations = ["÷", "×", "+", "−", "%"]; // Contains all the operators used in the calculations


// Function which gets called when a number or operator button is clicked
function passid(id) {
    let clickedvalue = document.getElementById(id).innerText;

    if (clickedvalue == "." && inputBox.value[inputBox.value.length - 1] != ".") {
        inputBox.value += clickedvalue;
    }
    else if (!isNaN(clickedvalue)) {
        inputBox.value += clickedvalue;
    }
    else {
        symbolpressed(clickedvalue);
    }
}


// Function that adds the operators to the field. Also prevents user from spamming operators.
function symbolpressed(clickedvalue) {

    if (isNaN(inputBox.value[inputBox.value.length - 1])) {
        inputBox.value = inputBox.value.substring(0, inputBox.value.length - 1) + clickedvalue;
    }
    else {
        inputBox.value += clickedvalue;
    }

}


// When AC button is clicked, the input box is cleared.
function clearbox() {
    inputBox.value = "";
}


// When = button is clicked this function is called
function caclulate() {
    let fieldArray = formatInputField();
    inputBox.value = (process(fieldArray));

    if (inputBox.value == Infinity) {
        inputBox.value = "Not Defined";
    }
}


// Function converts input field text to an array with parsed numbers and operators
function formatInputField() {
    let field = inputBox.value;
    let eval = [];
    let temp = 0;
    let floatFlag = 0;
    let digitsAfterDecimal = 0;
    for (let i = 0; i < field.length; i++) {
        let elem = field[i];
        if (floatFlag == 1 && !isNaN(elem)) {
            digitsAfterDecimal += 1;
        }
        if (elem == '.') {
            floatFlag = 1;
        }
        if (!isNaN(elem)) {
            elem = parseInt(elem);
            temp = temp * 10 + elem;
        } if (operations.includes(elem)) {
            eval.push(temp / (Math.pow(10, digitsAfterDecimal)));
            eval.push(elem);
            temp = 0;
            floatFlag = 0;
            digitsAfterDecimal = 0
        }
    }
    eval.push(temp / (Math.pow(10, digitsAfterDecimal)));
    return eval;
}


// Recieves the output from formatInputField function, and then focuses on the operators and executes them
function process(array) {
    operations.forEach(function (item, index) {

        while (array.includes(item)) {
            let index = array.indexOf(item);
            let answer = actOperation(array[index - 1], array[index + 1], item);
            array = popAndInsert(index, answer, array);
        }
    })

    return array;
}


// This function gets the index of an operator, removes the operator, the number before and after it, and then inserts the answer.
function popAndInsert(index, answer, array) {
    let newArray = [];
    newArray = array.slice(0, index - 1);
    newArray.push(answer);
    newArray = newArray.concat(array.slice(index + 2, array.length));

    return newArray;
}


// The arrays in the above functions consisted of modified characters like "÷".
// These then are passed through a switch case to execute and return the answers of corresponding operations.
function actOperation(a, b, operator) {
    switch (operator) {
        case "÷":
            return a / b;
            break;
        case "×":
            return a * b;
            break;
        case "+":
            return a + b;
            break;
        case "−":
            return a - b;
            break;

        default:
            break;
    }
}

function typingSymbolChange() {
    let field = inputBox.value;
    let changeList = ["/", "*", "-", "%"];
    let newList = ["÷", "×", "−", "%"];

    changeList.forEach(function (item, index) {

        while (field.includes(item)) {
            let fieldIndex = field.indexOf(item);
            field = field.replace(item, newList[index]);
        }
    })
    inputBox.value = field;

}
function backspace() {
    inputBox.value = inputBox.value.substring(0, inputBox.value.length - 1);
}


// Called when percentage button is clicked
function percentage() {
    let fieldArray = formatInputField();
    let lastNumber = fieldArray[fieldArray.length - 1];

    // If only a single number is in the input and the percentage button is pressed, it returns 1% of the value
    if (fieldArray.length < 3) {
        inputBox.value = lastNumber * 0.01;
    }
    // Else, the intermediate answer till the last number is calculated, and the last number is replaced with the percentage of the intermediate answer.
    else {
        inputBox.value = fieldArray.slice(0, fieldArray.length - 1).join("") + process(fieldArray.slice(0, fieldArray.length - 2)) * lastNumber * 0.01;
    }
}