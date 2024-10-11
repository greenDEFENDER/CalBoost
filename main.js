
document.addEventListener('DOMContentLoaded', function() {
  const settingsForm = document.getElementById('settingsForm');
  const problemArea = document.getElementById('problemArea');
  const answerInput = document.getElementById('answerInput');
  const submitAnswer = document.getElementById('submitAnswer');
  const scoreDisplay = document.getElementById('score');
  const timerDisplay = document.getElementById('timer');
  
  let currentProblem, currentAnswer, score = 0, timer;

  // Form submission handler
  settingsForm.addEventListener('submit', function(event) {
    event.preventDefault();
    startChallenge();
  });

  // Submit answer handler
  submitAnswer.addEventListener('click', function() {
    checkAnswer();
  });

  // Function to start challenge
  function startChallenge() {
    score = 0;
    scoreDisplay.textContent = 'Score: 0';
    timer = 60;  // 60 seconds timer
    generateProblem();
    startTimer();
  }

  // Function to generate random number based on difficulty
  function generateRandomNumber(difficulty) {
    let min, max;
    switch (difficulty) {
      case 'easy':
        min = 1; max = 10;
        break;
      case 'medium':
        min = 10; max = 100;
        break;
      case 'hard':
        min = 100; max = 1000;
        break;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Function to generate math problem
  function generateProblem() {
    const numOperands = parseInt(document.getElementById('numOperands').value);
    const operations = [];
    const difficulty = document.getElementById('difficulty').value;

    if (document.getElementById('addition').checked) operations.push('+');
    if (document.getElementById('subtraction').checked) operations.push('-');
    if (document.getElementById('multiplication').checked) operations.push('*');
    if (document.getElementById('division').checked) operations.push('/');

    if (operations.length === 0) {
      alert('Please select at least one operation!');
      return;
    }

    let operands = [];
    for (let i = 0; i < numOperands; i++) {
      operands.push(generateRandomNumber(difficulty));  // Generate numbers based on difficulty
    }

    let operation = operations[Math.floor(Math.random() * operations.length)];

    if (operation === '/') {
      let dividend = operands[0] * operands[1];  // Ensure clean division
      currentProblem = `${dividend} ${operation} ${operands[1]}`;
      currentAnswer = dividend / operands[1];
    } else {
      currentProblem = operands.join(` ${operation} `);
      currentAnswer = eval(currentProblem);
    }

    document.getElementById('mathProblem').textContent = currentProblem;
  }

  // Timer function
  function startTimer() {
    const interval = setInterval(function() {
      timer--;
      timerDisplay.textContent = `Time: ${timer}`;
      if (timer === 0) {
        clearInterval(interval);
        alert('Time's up! Final Score: ' + score);
      }
    }, 1000);
  }

  // Check answer function
  function checkAnswer() {
    const userAnswer = parseFloat(answerInput.value);
    if (userAnswer === currentAnswer) {
      const difficulty = document.getElementById('difficulty').value;
      let scoreIncrement = 1;
      if (difficulty === 'medium') scoreIncrement = 2;
      else if (difficulty === 'hard') scoreIncrement = 3;

      score += scoreIncrement;  // Add points based on difficulty
      scoreDisplay.textContent = 'Score: ' + score;
      generateProblem();  // Generate new problem
    } else {
      alert('Incorrect! Try again.');
    }
    answerInput.value = '';  // Clear input
  }
});
