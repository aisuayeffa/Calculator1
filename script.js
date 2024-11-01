let history = document.getElementById("history");
let result = document.getElementById("result");
let currentInput = "";
let isResultDisplayed = false;

function updateDisplay() {
    history.innerText = currentInput || "0";
}

function inputNumber(number) {
    if (isResultDisplayed) {
        currentInput = "";
        isResultDisplayed = false;
    }
    currentInput += number;
    updateDisplay();
}

function inputOperator(operator) {
    if (isResultDisplayed) {
        isResultDisplayed = false;
    }

    if (currentInput === "" && operator === "-") {
        
        currentInput += operator;
    } else if (currentInput !== "" && !isNaN(currentInput.slice(-1))) {
        
        currentInput += operator;
    } else if (/[+\-*/]$/.test(currentInput)) {
        
        currentInput = currentInput.slice(0, -1) + operator;
    }
    updateDisplay();
}

function clearDisplay() {
    currentInput = "";
    result.innerText = "0";
    isResultDisplayed = false;
    updateDisplay();
}

function deleteLast() {
    if (isResultDisplayed) {
        clearDisplay();
    } else {
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
    }
}

function calculate() {
    try {
        const evaluatedResult = eval(currentInput.replace(/x/g, '*'));
        result.innerText = evaluatedResult;
        currentInput = evaluatedResult.toString();
        isResultDisplayed = true;
    } catch (error) {
        result.innerText = "Error";
        currentInput = "";
        isResultDisplayed = false;
    }
    updateDisplay();
}

function togglesign() {
    
    if (isResultDisplayed) {
        currentInput = result.innerText;
        isResultDisplayed = false;
    }
    
    
    if (currentInput === "") {
        currentInput = "-";
    } else if (currentInput[0] === "-") {
        
        currentInput = currentInput.slice(1);
    } else {
        
        currentInput = "-" + currentInput;
    }
    updateDisplay();
}

function brackets() {
    const openBrackets = (currentInput.match(/\(/g) || []).length;
    const closeBrackets = (currentInput.match(/\)/g) || []).length;
    if (openBrackets > closeBrackets) {
        currentInput += ")";
    } else {
        currentInput += "(";
    }
    updateDisplay();
}

function calculatePercentage() {
    if (currentInput !== "") {
        try {
            
            const evaluatedResult = eval(currentInput.replace(/x/g, '*'));
            const percentageResult = evaluatedResult / 100; // Calculate the percentage
            currentInput = percentageResult.toString(); // Update current input with percentage
            result.innerText = percentageResult;
            isResultDisplayed = true;
        } catch (error) {
            result.innerText = "Error";
            currentInput = "";
            isResultDisplayed = false;
        }
        updateDisplay();
    }
}