document.addEventListener('DOMContentLoaded', function() {
    const settingsForm = document.getElementById('settingsForm');
    const problemArea = document.getElementById('problemArea');
    const answerInput = document.getElementById('answerInput');
    const submitAnswer = document.getElementById('submitAnswer');
    const scoreDisplay = document.getElementById('score');
    const timerDisplay = document.getElementById('timer');
    const notification = document.getElementById('notification');

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
        timer = parseInt(document.getElementById('sessionDuration').value) * 60; // Convert minutes to seconds
        timerDisplay.textContent = `Time: ${timer}`;
        problemArea.style.display = 'block'; // Show problem area
        generateProblem();
        startTimer();
    }

    // Function to generate random number based on difficulty
    function generateRandomNumber(difficulty, limit) {
        return Math.floor(Math.random() * limit) + 1;
    }

    // Function to generate math problem
    function generateProblem() {
        const numOperands = parseInt(document.getElementById('numOperands').value);
        const operations = [];
        const difficulty = document.getElementById('difficulty').value;
        const maxSquare = 50;  // Max limit for squares
        const maxCube = 30;    // Max limit for cubes

        if (document.getElementById('addition').checked) operations.push('+');
        if (document.getElementById('subtraction').checked) operations.push('-');
        if (document.getElementById('multiplication').checked) operations.push('*');
        if (document.getElementById('division').checked) operations.push('/');
        if (document.getElementById('squares').checked) operations.push('square');
        if (document.getElementById('cubes').checked) operations.push('cube');

        if (operations.length === 0) {
            showNotification('Please select at least one operation!', 'danger');
            return;
        }

        let operands = [];
        for (let i = 0; i < numOperands; i++) {
            if (operations.includes('square')) {
                const num = generateRandomNumber(difficulty, maxSquare);
                operands.push(num);
            } else if (operations.includes('cube')) {
                const num = generateRandomNumber(difficulty, maxCube);
                operands.push(num);
            } else {
                operands.push(generateRandomNumber(difficulty, difficulty === 'easy' ? 10 : (difficulty === 'medium' ? 100 : 1000)));
            }
        }

        const operation = operations[Math.floor(Math.random() * operations.length)];

        if (operation === 'square') {
            currentProblem = `${operands[0]}²`;
            currentAnswer = Math.pow(operands[0], 2);
        } else if (operation === 'cube') {
            currentProblem = `${operands[0]}³`;
            currentAnswer = Math.pow(operands[0], 3);
        } else {
            let expression = operands.join(` ${operation} `);
            if (operation === '/') {
                let dividend = operands[0] * operands[1];  // Ensure clean division
                currentProblem = `${dividend} ${operation} ${operands[1]}`;
                currentAnswer = dividend / operands[1];
            } else {
                currentProblem = expression;
                currentAnswer = eval(expression);
            }
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
                showNotification(`Time's up! Final Score: ${score}`, 'info');
                problemArea.style.display = 'none'; // Hide problem area
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
            showNotification('Correct! Well done!', 'success');
            generateProblem();  // Generate new problem
        } else {
            showNotification('Incorrect! Try again.', 'danger');
        }
        answerInput.value = '';  // Clear input
    }

    // Function to show notifications
    function showNotification(message, type) {
        notification.className = `alert alert-${type}`;
        notification.textContent = message;
        notification.style.display = 'block'; // Show notification
        setTimeout(() => {
            notification.style.display = 'none'; // Hide after 3 seconds
        }, 3000);
    }
});
