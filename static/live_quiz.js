// ======================================================
// QUESTIONS
// ======================================================
let total = 0;
const cache = {};

// ======================================================
// APPLICATION STATE
// ======================================================
let currentQuestion = 0;
const userAnswers = [];

async function getQuestion(index) {
    if (cache[index]) {
        return cache[index];
    }
    try {
        const response = await fetch(`/api/question/${index}`);
        if (!response.ok) {
            throw new Error("HTTP " + response.status);
        }
        const data = await response.json();
        cache[index] = data;
        return data;
    } catch (error) {
        throw error;
    }
}

// ======================================================
// SAVE AN ANSWER
// ======================================================
function saveAnswer(choiceIndex) {
 userAnswers[currentQuestion] = choiceIndex;
}

// ======================================================
// NAVIGATION
// ======================================================
function goNext() {
    if (currentQuestion < total - 1) {
        currentQuestion++;
        renderQuestion();
    }
}

function goPrevious() {
    if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion();
    }
}

function goFirst() {
    currentQuestion = 0;
    renderQuestion();
}

function goLast() {
    currentQuestion = total - 1;
    renderQuestion();
}

// ======================================================
// CALCULATE SCORE
// ======================================================
async function calculateScore() {
    let score = 0;
    for (let i = 0; i < total; i++) {
        const q = await getQuestion(i);

        if (userAnswers[i] === q.answer) {
            score++;
        }
    }
    return score;
}
// ======================================================
// CALCULATE PERCENTAGE
// ======================================================
function calculatePercentage(score) {
    return Math.round((score / total) * 100);
}


// ======================================================
// PERFORMANCE MESSAGE
// ======================================================
function getPerformanceMessage(percentage) {
 if (percentage >= 80) {
    return "Excellent";
}
else if (percentage >= 60) {
    return "Good";
}
else if (percentage >= 50) {
    return "Pass";
}
else {
    return "Needs improvement";
}
}

// ======================================================
// BUILD CORRECTION
// ======================================================
async function buildCorrection() {
    let correction = "";
    for (let i = 0; i < total; i++) {
        const q = await getQuestion(i);
        correction += "Question " + (i + 1) + ": " + q.question + "\n";
        if (userAnswers[i] === undefined) {
            correction += "Your answer: Not Answered\n";
        } else {
            correction += "Your answer: " +
                q.choices[userAnswers[i]] + "\n";
        }
        correction += "Correct answer: " +
            q.choices[q.answer] + "\n";
        if (userAnswers[i] === q.answer) {
            correction += "Result: Correct\n";
        } else {
            correction += "Result: Incorrect\n";
        }
        correction += "Explanation: " +
            q.explanation + "\n\n";
    }
    return correction;
}


// ======================================================
// PROVIDED INTERFACE CODE
//
// DOM manipulation and events will be studied later.
// ======================================================

// ======================================================
// SUBMIT QUIZ
// ======================================================
async function submitQuiz() {
    const score = await calculateScore();
    const percentage = calculatePercentage(score);
    const message = getPerformanceMessage(percentage);
    const correction = await buildCorrection();

    showResults(score, percentage, message, correction);
}

async function renderQuestion() {
    document.getElementById("loading").hidden = false;
    document.getElementById("error").hidden = true;

    try {
        const q = await getQuestion(currentQuestion);

        // --------------------------------------------------
        // QUESTION NUMBER
        // --------------------------------------------------
        document.getElementById("progress").textContent =
            `Question ${currentQuestion + 1} of ${total}`;

        // --------------------------------------------------
        // QUESTION
        // --------------------------------------------------
        document.getElementById("questionText").textContent = q.question;

        // --------------------------------------------------
        // CHOICES
        // --------------------------------------------------
        const choicesContainer = document.getElementById("choices");
        choicesContainer.innerHTML = "";

        for (let i = 0; i < q.choices.length; i++) {
            const label = document.createElement("label");
            label.className = "choice";

            const radio = document.createElement("input");
            radio.type = "radio";
            radio.name = "answer";
            radio.value = i;

            // Restore an answer previously selected
            if (userAnswers[currentQuestion] === i) {
                radio.checked = true;
            }

            // Save the selected answer
            radio.onclick = function () {
                saveAnswer(i);
            };

            label.appendChild(radio);
            label.appendChild(
                document.createTextNode(" " + q.choices[i])
            );

            choicesContainer.appendChild(label);
        }

        // --------------------------------------------------
        // NAVIGATION BUTTONS
        // --------------------------------------------------
        document.getElementById("firstBtn").disabled =
            currentQuestion === 0;

        document.getElementById("previousBtn").disabled =
            currentQuestion === 0;

        document.getElementById("nextBtn").disabled =
            currentQuestion === total - 1;

        document.getElementById("lastBtn").disabled =
            currentQuestion === total - 1;

    } catch (error) {
        document.getElementById("error").textContent =
            "Could not load question: " + error.message;

        document.getElementById("error").hidden = false;

    } finally {
        document.getElementById("loading").hidden = true;
    }
}


// ======================================================
// DISPLAY RESULTS
// ======================================================
function showResults(score, percentage, message, correction) {
    document.getElementById("quizPanel").style.display = "none";
    document.getElementById("resultsPanel").style.display = "block";
    document.getElementById("scoreText").textContent =
        `Score: ${score} / ${total}`;
    document.getElementById("percentageText").textContent =
        `Percentage: ${percentage}%`;
    document.getElementById("performanceText").textContent = message;
    document.getElementById("correction").textContent = correction;
}


// ======================================================
// START APPLICATION
// ======================================================


async function init() {
    try {
        const response = await fetch("/api/questions/count");
        if (!response.ok) {
            throw new Error("HTTP " + response.status);
        }
        const data = await response.json();
        total = data.count;
        await renderQuestion();
    } catch (error) {
        document.getElementById("error").textContent =
            "Could not load quiz: " + error.message;
        document.getElementById("error").hidden = false;
    }
}
init();