document.addEventListener('DOMContentLoaded', function() {
    const settingsForm = document.getElementById('settingsForm');
    const problemArea = document.getElementById('problemArea');
    const answerInput = document.getElementById('answerInput');
    const scoreDisplay = document.getElementById('score');
    const timerDisplay = document.getElementById('timer');
    const notification = document.getElementById('notification');
    const keypadButtons = document.querySelectorAll('.keypad-button');
    const submitKeypad = document.getElementById('submitKeypad');

    let currentProblem, currentAnswer, score = 0, timer;

    // Form submission handler
    settingsForm.addEventListener('submit', function(event) {
        event.preventDefault();
        startChallenge();
    });

    // Keypad button click handler
    keypadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            if (value === 'clear') {
                answerInput.value = ''; // Clear input
            } else {
                answerInput.value += value; // Append value to input
            }
        });
    });

    // Submit answer handler
    submitKeypad.addEventListener('click', function() {
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

    // Function to generate random number based on difficulty and limit
    function generateRandomNumber(limit) {
        return Math.floor(Math.random() * limit) + 1;
    }

    // Function to generate math problem
    function generateProblem() {
        const numOperands = parseInt(document.getElementById('numOperands').value);
        const operations = [];
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

        let problemText = '';
        let result;

        const selectedOperation = operations[Math.floor(Math.random() * operations.length)];

        // Generate problem for squares
        if (selectedOperation === 'square') {
            const number = generateRandomNumber(maxSquare);
            problemText = `${number}²`;
            result = number * number;
        }
        // Generate problem for cubes
        else if (selectedOperation === 'cube') {
            const number = generateRandomNumber(maxCube);
            problemText = `${number}³`;
            result = number * number * number;
        } else {
            // For other operations
            let operands = [];
            for (let i = 0; i < numOperands; i++) {
                operands.push(generateRandomNumber(10)); // Generate random operands between 1 and 10
            }
            result = operands.reduce((acc, curr) => eval(`${acc} ${selectedOperation} ${curr}`));

            // Build the problem text
            problemText = operands.join(` ${selectedOperation} `);
        }

        currentProblem = problemText;
        currentAnswer = result;
        document.getElementById('mathProblem').textContent = currentProblem;
    }

    // Function to start timer
    function startTimer() {
        const interval = setInterval(function() {
            if (timer > 0) {
                timer--;
                timerDisplay.textContent = `Time: ${timer}`;
            } else {
                clearInterval(interval);
                endSession();
            }
        }, 1000);
    }

    // Function to check answer
    function checkAnswer() {
        const userAnswer = parseFloat(answerInput.value);
        if (userAnswer === currentAnswer) {
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
            answerInput.value = '';
            generateProblem();
        } else {
            showNotification('Incorrect answer. Try again!', 'danger');
        }
    }

    // Function to end session
    function endSession() {
        showNotification(`Session ended! Your final score is ${score}.`, 'success');
        problemArea.style.display = 'none';
        answerInput.value = '';
    }

    // Function to show notification
    function showNotification(message, type) {
        notification.textContent = message;
        notification.className = `alert alert-${type}`;
        notification.style.display = 'block';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }
});
