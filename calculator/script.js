// Screen ke dono hisse pakad lein
const previousOperandEl = document.getElementById('previousOperand');
const currentOperandEl = document.getElementById('currentOperand');

let currentOperand = '0';
let previousOperand = '';
let operation = undefined;

// Screen update karne wala function
function updateScreen() {
  currentOperandEl.textContent = currentOperand;
  if (operation != null) {
    previousOperandEl.textContent = `${previousOperand} ${operation}`;
  } else {
    previousOperandEl.textContent = '';
  }
}

// Number button dabane par
function appendNumber(number) {
  if (number === '.' && currentOperand.includes('.')) return;
  if (currentOperand === '0' && number !== '.') {
    currentOperand = number;
  } else {
    currentOperand += number;
  }
}

// Operator (+, -, ×, /) dabane par
function chooseOperation(op) {
  if (currentOperand === '') return;
  if (previousOperand !== '') {
    calculate();
  }
  operation = op;
  previousOperand = currentOperand;
  currentOperand = '';
}

// "=" dabane par asal calculation
function calculate() {
  let result;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operation) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      result = current === 0 ? 'Error' : prev / current;
      break;
    case '%':
      result = prev % current;
      break;
    default:
      return;
  }

  currentOperand = result.toString();
  operation = undefined;
  previousOperand = '';
}

// AC button — sab kuch clear
function clearAll() {
  currentOperand = '0';
  previousOperand = '';
  operation = undefined;
}

// DEL button — akhri digit hatayein
function deleteLast() {
  currentOperand = currentOperand.toString().slice(0, -1);
  if (currentOperand === '') currentOperand = '0';
}

// Har button par click sunne ke liye
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', () => {
    const action = button.dataset.action;
    const value = button.dataset.value;

    if (action === 'number') {
      appendNumber(value);
    } else if (action === 'operator') {
      chooseOperation(value);
    } else if (action === 'equals') {
      calculate();
    } else if (action === 'clear') {
      clearAll();
    } else if (action === 'delete') {
      deleteLast();
    }

    updateScreen();
  });
});