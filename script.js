class Calculator {
  constructor(previousOperandElement, currentOperandElement) {
    this.previousOperandElement = previousOperandElement;
    this.currentOperandElement = currentOperandElement;
    this.clear();
  }

  clear() {
    this.currentOperand = "0";
    this.previousOperand = "";
    this.operation = undefined;
    this.shouldResetScreen = false;
  }

  delete() {
    if (this.currentOperand === "0") return;
    if (this.currentOperand.length === 1) {
      this.currentOperand = "0";
    } else {
      this.currentOperand = this.currentOperand.slice(0, -1);
    }
  }

  appendNumber(number) {
    if (this.shouldResetScreen) {
      this.currentOperand = "0";
      this.shouldResetScreen = false;
    }

    if (number === "." && this.currentOperand.includes(".")) return;

    if (this.currentOperand === "0" && number !== ".") {
      this.currentOperand = number;
    } else {
      this.currentOperand += number;
    }
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;

    if (this.previousOperand !== "") {
      this.compute();
    }

    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "0";
  }

  compute() {
    let computation;
    const prev = Number.parseFloat(this.previousOperand);
    const current = Number.parseFloat(this.currentOperand);

    if (Number.isNaN(prev) || Number.isNaN(current)) return;

    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "/":
        if (current === 0) {
          this.showAlert("Cannot divide by zero!", "error");
          this.clear();
          return;
        }
        computation = prev / current;
        break;
      case "^":
        computation = Math.pow(prev, current);
        break;
      case "%":
        computation = prev % current;
        break;
      default:
        return;
    }

    this.currentOperand = this.roundResult(computation).toString();
    this.operation = undefined;
    this.previousOperand = "";
    this.shouldResetScreen = true;
  }

  roundResult(number) {
    return Math.round(number * 100000000) / 100000000;
  }

  calculatePercent() {
    const current = Number.parseFloat(this.currentOperand);
    if (Number.isNaN(current)) return;
    this.currentOperand = (current / 100).toString();
  }

  calculateSquareRoot() {
    const current = Number.parseFloat(this.currentOperand);
    if (Number.isNaN(current)) return;
    if (current < 0) {
      alert("Cannot calculate square root of negative number!");
      return;
    }
    this.currentOperand = Math.sqrt(current).toString();
  }

  calculateSquare() {
    const current = Number.parseFloat(this.currentOperand);
    if (Number.isNaN(current)) return;
    this.currentOperand = (current * current).toString();
  }

  calculateReciprocal() {
    const current = Number.parseFloat(this.currentOperand);
    if (Number.isNaN(current)) return;
    if (current === 0) {
      this.showAlert("Cannot divide by zero!", "error");
      return;
    }
    this.currentOperand = (1 / current).toString();
  }

  toggleSign() {
    const current = Number.parseFloat(this.currentOperand);
    if (Number.isNaN(current)) return;
    this.currentOperand = (-current).toString();
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = Number.parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;

    if (Number.isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandElement.textContent = this.getDisplayNumber(
      this.currentOperand
    );

    if (this.operation != null) {
      const operatorSymbol = {
        "+": "+",
        "-": "−",
        "*": "×",
        "/": "÷",
        "^": "^",
        "%": "mod",
      }[this.operation];

      this.previousOperandElement.textContent = `${this.getDisplayNumber(
        this.previousOperand
      )} ${operatorSymbol}`;
    } else {
      this.previousOperandElement.textContent = "";
    }
  }

  showAlert(message, type = "error") {
    const el = document.getElementById("calc-alert");
    if (!el) return;
    el.textContent = message;
    el.classList.remove("show", "error", "success");
    el.classList.add("show", type);
    clearTimeout(this._alertTimer);
    this._alertTimer = setTimeout(() => {
      el.classList.remove("show");
    }, 2600);
  }
}

// Initialize calculator
const previousOperandElement = document.querySelector(".previous-operand");
const currentOperandElement = document.querySelector(".current-operand");
const calculator = new Calculator(
  previousOperandElement,
  currentOperandElement
);

// Number buttons
document.querySelectorAll("[data-number]").forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.dataset.number);
    calculator.updateDisplay();
  });
});

// Operator buttons
document.querySelectorAll("[data-operator]").forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.dataset.operator);
    calculator.updateDisplay();
  });
});

// Action buttons
document.querySelectorAll("[data-action]").forEach((button) => {
  button.addEventListener("click", () => {
    switch (button.dataset.action) {
      case "clear":
        calculator.clear();
        break;
      case "delete":
        calculator.delete();
        break;
      case "equals":
        calculator.compute();
        break;
      case "percent":
        calculator.calculatePercent();
        break;
      case "sqrt":
        calculator.calculateSquareRoot();
        break;
      case "square":
        calculator.calculateSquare();
        break;
      case "reciprocal":
        calculator.calculateReciprocal();
        break;
      case "sign":
        calculator.toggleSign();
        break;
    }
    calculator.updateDisplay();
  });
});

// Keyboard support
document.addEventListener("keydown", (e) => {
  if ((e.key >= "0" && e.key <= "9") || e.key === ".") {
    calculator.appendNumber(e.key);
    calculator.updateDisplay();
  }

  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
    calculator.chooseOperation(e.key);
    calculator.updateDisplay();
  }

  if (e.key === "Enter" || e.key === "=") {
    e.preventDefault();
    calculator.compute();
    calculator.updateDisplay();
  }

  if (e.key === "Escape") {
    calculator.clear();
    calculator.updateDisplay();
  }

  if (e.key === "Backspace") {
    calculator.delete();
    calculator.updateDisplay();
  }

  if (e.key === "%") {
    calculator.calculatePercent();
    calculator.updateDisplay();
  }

  if (e.key === "^") {
    calculator.chooseOperation("^");
    calculator.updateDisplay();
  }

  if (e.key.toLowerCase() === "r") {
    calculator.calculateSquareRoot();
    calculator.updateDisplay();
  }

  if (e.key.toLowerCase() === "s") {
    calculator.calculateSquare();
    calculator.updateDisplay();
  }

  if (e.key.toLowerCase() === "i") {
    calculator.calculateReciprocal();
    calculator.updateDisplay();
  }
});

// Initial display
calculator.updateDisplay();
