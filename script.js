let operator = "";
let previousValue = "";
let currentValue = "";

document.addEventListener("DOMContentLoaded", function() {
    //Get all components of HTML file in our JS
    let clear = document.querySelector("#clear-btn");
    let equal = document.querySelector(".equal");
    let decimal = document.querySelector(".decimal");
    let numbers = document.querySelectorAll(".number");
    let operators = document.querySelectorAll(".operator");
    let previousScreen = document.querySelector(".previous");
    let currentScreen = document.querySelector(".current");

    numbers.forEach((number) => number.addEventListener("click", function(n) {
        handleNumber(n.target.textContent);
        currentScreen.textContent = currentValue;
    }));

    operators.forEach((ope) => ope.addEventListener("click", function(n) {
        handleOperator(n.target.textContent);
        previousScreen.textContent = previousValue + " " + operator;
        currentScreen.textContent = currentValue;
    }));

    clear.addEventListener("click", function() {
        previousValue = "";
        currentValue = "";
        operator = "";
        previousScreen.textContent = previousValue;
        currentScreen.textContent = currentValue;
    });

    equal.addEventListener("click", function() {
        if (currentValue != "" && previousValue != "") {
            calculate();
        //Display the calculated result
            previousScreen.textContent = "";
            if (previousValue.length <= 5) {
                currentScreen.textContent = previousValue;
            } else {
                currentScreen.textContent = previousValue.slice(0, 5) + "...";
            }
        }

    });

    decimal.addEventListener("click", function() {
        addDecimal();
    })
});



function handleNumber(num) {
    if (currentValue.length <= 5) {
        currentValue += num;
    }
}

function handleOperator(ope) {
    operator = ope;
    previousValue = currentValue;
    currentValue = "";
}

function calculate() {
    previousValue = Number(previousValue);
    currentValue = Number(currentValue);

    if (operator === "+") {
        previousValue += currentValue;
    } else if (operator === "-") {
        previousValue -= currentValue;
    } else if (operator === "x") {
        previousValue *= currentValue;
    } else {
        previousValue /= currentValue;
    }

    //Round the number value
    previousValue = roundNumber(previousValue);

    //Convert number values to string
    previousValue = previousValue.toString();
    currentValue = previousValue.toString();
}

//Create function that rounds calculated result
function roundNumber (num) {
     return Math.round(num * 1000) / 1000;
}

//Create decimal function
function addDecimal() {
    if (!currentValue.includes(".")) {
        currentValue += ".";
    }
}