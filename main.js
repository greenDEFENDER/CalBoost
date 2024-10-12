// DOM elements
const settingsForm = document.getElementById('settingsForm');
const problemArea = document.getElementById('problemArea');
const mathProblem = document.getElementById('mathProblem');
const answerInput = document.getElementById('answerInput');
const submitKeypad = document.getElementById('submitKeypad');
const notification = document.getElementById('notification');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const keypadButtons = document.querySelectorAll('.keypad-button');

// Variables for session control
let score = 0;
let timer;
let currentAnswer;
let sessionDuration;
let remainingTime;
let totalQuestions = 0;

// Start the challenge
settingsForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Validate form input
  sessionDuration = parseInt(document.getElementById('sessionDuration').value);
  const operations = getSelectedOperations();

  if (sessionDuration < 1 || isNaN(sessionDuration)) {
    showNotification('Please enter a valid session duration!', 'danger');
    return;
  }
  
  if (operations.length === 0) {
    showNotification('Please select at least one operation.', 'danger');
    return;
  }

  // Hide form and show problem area
  settingsForm.style.display = 'none';
  problemArea.style.display = 'block';

  // Start the timer
  startTimer(sessionDuration);

  // Generate the first math problem
  generateProblem();
});

// Generate a new math problem based on selected options
function generateProblem() {
  const numOperands = parseInt(document.getElementById('numOperands').value);
  const operations = getSelectedOperations();

  const difficulty = document.getElementById('difficulty').value;
  let operands = generateOperands(numOperands, difficulty);

  // Select a random operation
  const operation = operations[Math.floor(Math.random() * operations.length)];
  let problemText = '';
  
  switch (operation) {
    case 'addition':
      currentAnswer = operands.reduce((a, b) => a + b);
      problemText = operands.join(' + ');
      break;
    case 'subtraction':
      // Ensure the result is non-negative by sorting operands in descending order
      operands.sort((a, b) => b - a);
      currentAnswer = operands.reduce((a, b) => a - b);
      problemText = operands.join(' - ');
      break;
    case 'multiplication':
      currentAnswer = operands.reduce((a, b) => a * b);
      problemText = operands.join(' × ');
      break;
    case 'division':
      // Ensure division results in a natural number (integer)
      operands = generateDivisibleOperands(difficulty);
      currentAnswer = operands[0] / operands[1];
      problemText = `${operands[0]} ÷ ${operands[1]}`;
      break;
    case 'squares':
      const number = operands[0];
      currentAnswer = Math.pow(number, 2);
      problemText = `${number}²`;
      break;
    case 'cubes':
      const num = operands[0];
      currentAnswer = Math.pow(num, 3);
      problemText = `${num}³`;
      break;
  }

  mathProblem.textContent = problemText;
  totalQuestions++;
}

// Get selected operations
function getSelectedOperations() {
  const operations = [];
  if (document.getElementById('addition').checked) operations.push('addition');
  if (document.getElementById('subtraction').checked) operations.push('subtraction');
  if (document.getElementById('multiplication').checked) operations.push('multiplication');
  if (document.getElementById('division').checked) operations.push('division');
  if (document.getElementById('squares').checked) operations.push('squares');
  if (document.getElementById('cubes').checked) operations.push('cubes');
  return operations;
}

// Generate random operands based on the difficulty
function generateOperands(numOperands, difficulty) {
  const max = getMaxValue(difficulty);
  const operands = [];
  for (let i = 0; i < numOperands; i++) {
    operands.push(Math.floor(Math.random() * max) + 1);
  }
  return operands;
}

// Get max value for operands based on difficulty level
function getMaxValue(difficulty) {
  switch (difficulty) {
    case 'easy':
      return 10;
    case 'medium':
      return 50;
    case 'hard':
      return 100;
  }
}

// Ensure operands are divisible for division problems
function generateDivisibleOperands(difficulty) {
  const divisor = Math.floor(Math.random() * getMaxValue(difficulty)) + 1;
  const dividend = divisor * (Math.floor(Math.random() * getMaxValue(difficulty)) + 1);
  return [dividend, divisor];
}
/*
// Handle keypad input
keypadButtons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');
    if (value === 'clear') {
      answerInput.value = '';
      answerInput.classList.remove('is-invalid');
    } else {
      answerInput.value += value;
    }
  });
});
*/

// Handle keypad input
keypadButtons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');
    
    if (value === 'clear') {
      answerInput.value = '';
      answerInput.classList.remove('is-invalid');
    } else if (value === '-') {
      // Toggle '-' at the beginning of the input
      if (answerInput.value.startsWith('-')) {
        // Remove '-' if it's already there
        answerInput.value = answerInput.value.substring(1);
      } else {
        // Prepend '-' to the input if it's not there
        answerInput.value = '-' + answerInput.value;
      }
    } else {
      // Append the number to the input value
      answerInput.value += value;
    }
  });
});


// Handle answer submission
submitKeypad.addEventListener('click', () => {
  const userAnswer = parseFloat(answerInput.value);
  
  if (isNaN(userAnswer)) {
    answerInput.classList.add('is-invalid');
    return;
  }

  checkAnswer(userAnswer);
});

// Check user's answer
function checkAnswer(userAnswer) {
  if (userAnswer === currentAnswer) {
    score++;
    scoreElement.textContent = Score: ${score};
    answerInput.value = '';
    answerInput.classList.remove('is-invalid');
    generateProblem(); // Move to the next problem only if the answer is correct
  } else {
    score -= 2;
    answerInput.classList.add('is-invalid'); // Keep showing the same question until correct answer is provided
  }
}

// Show notification
function showNotification(message, type) {
  notification.textContent = message;
  notification.className = `alert alert-${type}`;
  notification.style.display = 'block';
  setTimeout(() => {
    notification.style.display = 'none';
  }, 3000);
}

function showNotificationForEnd(message, type) {
  notification.textContent = message;
  notification.className = `alert alert-${type}`;
  notification.style.display = 'block';
  setTimeout(() => {
    notification.style.display = 'none';
  }, 15000);
}

// Timer function
function startTimer(duration) {
  remainingTime = duration * 60;
  updateTimerDisplay();

  timer = setInterval(() => {
    remainingTime--;
    updateTimerDisplay();

    if (remainingTime <= 0) {
      clearInterval(timer);
      endSession();
    }
  }, 1000);
}

// Update timer display
function updateTimerDisplay() {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  timerElement.textContent = `Time: ${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

// End the session when time is up
function endSession() {
  problemArea.style.display = 'none';
  settingsForm.style.display = 'block';

  // Show total score
  showNotificationForEnd(`Session ended! Your total score is ${score} out of ${totalQuestions}.`, 'info');

  // Reset values for next session
  score = 0;
  totalQuestions = 0;
  scoreElement.textContent = 'Score: 0';
  answerInput.value = '';
}
