class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.readyToReset = false;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
        this.readyToReset = false;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
            if (this.previousOperand !== '') {
                this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }


    sqrt() {
        let sqrtResult;
        let err = 'error, press AC';
        let digit = parseFloat(this.previousOperand);
        if (isNaN(digit) || digit < 0) {
            this.currentOperandTextElement.innerText = `${err}`;
            return this.currentOperandTextElement.innerText;
        } 
        sqrtResult = Math.sqrt(digit);
        this.currentOperand = +sqrtResult.toFixed(8);
        this.updateDisplay();
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);        
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                
                break;
            case '÷':
                computation = prev / current;
                break;
            case 'xn':
                computation = Math.pow(prev, current);
                break;
            default:
                return;
        }
        this.readyToReset = true;
        this.currentOperand = +computation.toFixed(8);
        this.operation = undefined;
        this.previousOperand = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('ru', {
                maximumFractionDigits: 0 });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }

    }

    updateDisplay() {
        this.currentOperandTextElement.innerText =
            this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }

    minusMaker() {
        this.currentOperand *= -1;
     
    }

}


const numberButtons = document.querySelectorAll('[data-number]'),
    operationButtons = document.querySelectorAll('[data-operation]'),
    equalsButton = document.querySelector('[data-equals]'),
    deleteButton = document.querySelector('[data-delete]'),
    allClearButton = document.querySelector('[data-all-clear]'),
    sqrtButton = document.querySelector('[data-operation-sqrt]'),
    currentOperandTextElement = document.querySelector('[data-current-operand]'),
    switchBtn = document.querySelector('.switch'),
    previousOperandTextElement = document.querySelector('[data-previous-operand]');


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (calculator.previousOperand == "" &&
            calculator.currentOperand !== "" &&
            calculator.readyToReset) {
            calculator.currentOperand = "";
            calculator.readyToReset = false;
        }
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});

sqrtButton.addEventListener('click', () => {
    calculator.chooseOperation();
    calculator.sqrt();
});

switchBtn.addEventListener('click', () => {
    calculator.minusMaker();
    calculator.compute();
    calculator.updateDisplay();
});