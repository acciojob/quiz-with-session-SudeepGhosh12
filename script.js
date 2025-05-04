document.addEventListener("DOMContentLoaded", () => {
    const questions = document.querySelectorAll('#questions > div');
    const submitButton = document.getElementById('submit');
    const scoreDisplay = document.getElementById('score');

    // Load progress from sessionStorage
    loadProgress();

    // Event listener for Submit button
    submitButton.addEventListener('click', () => {
        let score = 0;
        const correctAnswers = {
            q1: '2', // Correct answer for Question 1
            q2: '3', // Correct answer for Question 2
            q3: '3', // Correct answer for Question 3
            q4: '2', // Correct answer for Question 4
            q5: '2', // Correct answer for Question 5
        };

        // Check answers and calculate score
        questions.forEach(question => {
            const questionName = question.querySelector('p').textContent.split(':')[0].toLowerCase();
            const selectedAnswer = question.querySelector('input[type="radio"]:checked');

            if (selectedAnswer && selectedAnswer.value === correctAnswers[questionName]) {
                score++;
            }
            // Save progress to sessionStorage
            saveProgress();
        });

        // Display score and save it to localStorage
        scoreDisplay.textContent = `Your score is ${score} out of 5.`;
        localStorage.setItem("score", score);
    });

    // Function to load progress from sessionStorage
    function loadProgress() {
        const progress = JSON.parse(sessionStorage.getItem("progress"));
        if (progress) {
            questions.forEach(question => {
                const questionName = question.querySelector('p').textContent.split(':')[0].toLowerCase();
                const selectedAnswerValue = progress[questionName];
                if (selectedAnswerValue) {
                    question.querySelector(`input[name="${questionName}"][value="${selectedAnswerValue}"]`).checked = true;
                }
            });
        }
    }

    // Function to save progress to sessionStorage
    function saveProgress() {
        const progress = {};
        questions.forEach(question => {
            const questionName = question.querySelector('p').textContent.split(':')[0].toLowerCase();
            const selectedAnswer = question.querySelector('input[type="radio"]:checked');
            if (selectedAnswer) {
                progress[questionName] = selectedAnswer.value;
            }
        });
        sessionStorage.setItem("progress", JSON.stringify(progress));
    }

    // Check if score is in localStorage and display it
    const savedScore = localStorage.getItem("score");
    if (savedScore) {
        scoreDisplay.textContent = `Your score is ${savedScore} out of 5.`;
    }
});