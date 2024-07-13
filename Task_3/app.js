document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    const resetButton = document.getElementById('reset');
    let currentInput = '';
    let firstOperand = null;
    let secondOperand = null;
    let currentOperation = null;
    let shouldResetDisplay = false;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');
            
            if (value === '=') {
                if (currentOperation && firstOperand !== null && currentInput !== '') {
                    secondOperand = parseFloat(currentInput);
                    display.textContent = calculate(firstOperand, secondOperand, currentOperation);
                    resetCalculator();
                }
            } else if (['+', '-', '*', '/'].includes(value)) {
                if (firstOperand === null) {
                    firstOperand = parseFloat(currentInput);
                    currentOperation = value;
                    shouldResetDisplay = true;
                    display.textContent = firstOperand + ' ' + currentOperation;
                } else if (shouldResetDisplay) {
                    currentOperation = value;
                    display.textContent = firstOperand + ' ' + currentOperation;
                } else {
                    secondOperand = parseFloat(currentInput);
                    firstOperand = calculate(firstOperand, secondOperand, currentOperation);
                    currentOperation = value;
                    display.textContent = firstOperand + ' ' + currentOperation;
                    shouldResetDisplay = true;
                }
            } else {
                if (shouldResetDisplay) {
                    display.textContent = '';
                    currentInput = '';
                    shouldResetDisplay = false;
                }
                currentInput += value;
                display.textContent += value;
            }
        });
    });

    resetButton.addEventListener('click', () => {
        display.textContent = '0';
        resetCalculator();
    });

    function calculate(a, b, operation) {
        switch (operation) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                return a / b;
            default:
                return b;
        }
    }

    function resetCalculator() {
        currentInput = '';
        firstOperand = null;
        secondOperand = null;
        currentOperation = null;
        shouldResetDisplay = false;
    }
});
