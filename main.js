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
                answerInput.classList.remove('is-invalid'); // Remove red border
            } else {
                answerInput.value += value; // Append value to input
                answerInput.classList.remove('is-invalid'); // Remove red border
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

    // Function to generate random number based on limit
    function generateRandomNumber(limit) {
        return Math.floor(Math.random() * limit) + 1;
    }

  /* // Function to generate math problem
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
    } */

   /* // Function to generate math problem
function generateProblem() {
    const numOperands = parseInt(document.getElementById('numOperands').value);
    const operations = [];
    const difficulty = document.getElementById('difficulty').value;

    if (document.getElementById('addition').checked) operations.push('+');
    if (document.getElementById('subtraction').checked) operations.push('-');
    if (document.getElementById('multiplication').checked) operations.push('*');
    if (document.getElementById('division').checked) operations.push('/');
    if (document.getElementById('squares').checked) operations.push('squares');
    if (document.getElementById('cubes').checked) operations.push('cubes');

    if (operations.length === 0) {
        alert('Please select at least one operation!');
        return;
    }

    let operands = [];
    for (let i = 0; i < numOperands; i++) {
        if (operations.includes('squares')) {
            operands.push(generateRandomNumber(difficulty, 50));
        } else if (operations.includes('cubes')) {
            operands.push(generateRandomNumber(difficulty, 30));
        } else {
            operands.push(generateRandomNumber(difficulty));
        }
    }

    let operation = operations[Math.floor(Math.random() * operations.length)];

    if (operation === '/') {
        // Ensure numerator is greater than denominator and results in a whole number
        let denominator = operands[1];
        let numerator;
        do {
            numerator = generateRandomNumber(difficulty);
        } while (numerator <= denominator || numerator % denominator !== 0);
        
        currentProblem = ${numerator} ${operation} ${denominator};
        currentAnswer = numerator / denominator;
    } else if (operation === '-') {
        // Ensure no negative results for subtraction
        let operand1 = operands[0];
        let operand2;
        do {
            operand2 = generateRandomNumber(difficulty);
        } while (operand1 < operand2);
        
        currentProblem = ${operand1} ${operation} ${operand2};
        currentAnswer = operand1 - operand2;
    } else if (operation === 'squares') {
        const operand = operands[0];
        currentProblem = ${operand} squared;
        currentAnswer = operand * operand;
    } else if (operation === 'cubes') {
        const operand = operands[0];
        currentProblem = ${operand} cubed;
        currentAnswer = operand * operand * operand;
    } else {
        currentProblem = operands.join( ${operation} );
        currentAnswer = eval(currentProblem);
    }

    document.getElementById('mathProblem').textContent = currentProblem;
} */

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
        problemText = ${number}²;
        result = number * number;
    }
    // Generate problem for cubes
    else if (selectedOperation === 'cube') {
        const number = generateRandomNumber(maxCube);
        problemText = ${number}³;
        result = number * number * number;
    } else {
        // For other operations
        let operands = [];
        for (let i = 0; i < numOperands; i++) {
            operands.push(generateRandomNumber(10)); // Generate random operands between 1 and 10
        }

        // Handle division to ensure whole number result
        if (selectedOperation === '/') {
            let numerator;
            let denominator;
            do {
                numerator = operands[0] = generateRandomNumber(10);
                denominator = operands[1] = generateRandomNumber(1, numerator); // Ensure numerator > denominator
            } while (numerator % denominator !== 0); // Ensure division results in whole number
            
            result = numerator / denominator;
            problemText = ${numerator} / ${denominator};
        } 
        // Handle subtraction to ensure no negative results
        else if (selectedOperation === '-') {
            let operand1;
            let operand2;
            do {
                operand1 = operands[0] = generateRandomNumber(10);
                operand2 = operands[1] = generateRandomNumber(1, operand1); // Ensure no negative results
            } while (operand1 < operand2); // Repeat until operand1 is greater than operand2
            
            result = operand1 - operand2;
            problemText = ${operand1} - ${operand2};
        } else {
            // For addition and multiplication
            result = operands.reduce((acc, curr) => eval(${acc} ${selectedOperation} ${curr}));
            // Build the problem text
            problemText = operands.join( ${selectedOperation} );
        }
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
            answerInput.classList.remove('is-invalid'); // Remove red border
            generateProblem();
        } else {
            answerInput.classList.add('is-invalid'); // Add red border
           // showNotification('Incorrect answer. Try again!', 'danger');
            // Clear the input after a short delay for user feedback
            setTimeout(() => {
                answerInput.value = ''; // Clear input for new attempt
                answerInput.classList.remove('is-invalid'); // Remove red border
            }, 350);
        }
    }

    // Function to end session
    function endSession() {
        showNotification(`Session ended! Your final score is ${score}.`, 'success');
        problemArea.style.display = 'none';
        answerInput.value = '';
        answerInput.classList.remove('is-invalid'); // Remove red border
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
