// ======================================================
// QUESTIONS
// ======================================================
const questions = [ // Populate this array with question objects as needed.
// Each question object should have the following structure:
  {
    question:
       "Which keyword declares a block-scoped variable that can later be reassigned?",
    choices: ["var", "let", "const", "static"],
    answer: 1,
    explanation:
      "let declares a block-scoped variable whose value may later be reassigned.",
  },
  {
    
  question: "Which JavaScript operator checks if both the value and type are equal?",
  choices: ["=", "==", "===", "!="],
  answer: 2,
  explanation: "The === operator checks both the value and the type."


  },
  {
  question: "What is the index of the first element in a JavaScript array?",
  choices: ["0", "1", "-1", "2"],
  answer: 0,
  explanation: "JavaScript arrays are zero-indexed, so the first element is at index 0."
},
{
  question: "Which statement is used to execute code only when a condition is true?",
  choices: ["for", "if", "const", "return"],
  answer: 1,
  explanation: "The if statement executes a block of code when its condition is true."
},
{
  question: "Which loop is commonly used when you know how many times you want to repeat something?",
  choices: ["if", "for", "const", "switch"],
  answer: 1,
  explanation: "A for loop is commonly used when the number of repetitions is known."
},
{
  question: "What does the return statement do inside a function?",
  choices: ["Repeats the function", "Stops the function and returns a value", "Creates a variable", "Creates a loop"],
  answer: 1,
  explanation: "The return statement stops the function and sends a value back."
},
{
  question: "How do you access the name property of an object called student?",
  choices: ["student.name", "student[name]", "student->name", "name.student"],
  answer: 0,
  explanation: "Dot notation can be used to access an object's property, such as student.name."
},
{
  question: "Which of the following values is falsy in JavaScript?",
  choices: ["Hello", "1", "0", "JavaScript"],
  answer: 2,
  explanation: "The number 0 is a falsy value in JavaScript."
},
{
  question: "What does the length property of an array return?",
  choices: ["The first element", "The last index", "The number of elements", "The array name"],
  answer: 2,
  explanation: "The length property returns the number of elements in an array."
},
{
  question: "What is a parameter in a JavaScript function?",
  choices: ["A value received by a function", "A type of loop", "An array index", "A comparison operator"],
  answer: 0,
  explanation: "A parameter is a variable used by a function to receive a value."
},

];
// ======================================================
// APPLICATION STATE
// ======================================================
let currentQuestion = 0;
const userAnswers = new Array(questions.length);

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
  if (currentQuestion < questions.length - 1) {
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
   currentQuestion = questions.length - 1;
    renderQuestion();
}

// ======================================================
// CALCULATE SCORE
// ======================================================
function calculateScore() {
    let score = 0;

    for (let i = 0; i < questions.length; i++) {
        if (userAnswers[i] === questions[i].answer) {
            score++;
        }
    }
    return score;
}

// ======================================================
// CALCULATE PERCENTAGE
// ======================================================
function calculatePercentage(score) {
      return Math.round((score / questions.length) * 100);
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
function buildCorrection() {
  
  let correction = "";
  //   Build a correction string that includes the question, the user's answer,
  //   the correct answer, and an explanation for each question.
  for (let i = 0; i < questions.length; i++) {
    let userAnswer;
    if (userAnswers[i] !== undefined) {
      userAnswer = questions[i].choices[userAnswers[i]];
    } else {
      userAnswer = "Not Answered";
    }
    let correctAnswer = questions[i].choices[questions[i].answer];
    let result;
    if (userAnswers[i] === questions[i].answer) {
      result = "Correct";
    } else {
      result = "Incorrect";
    }
    correction +=
      "Question " + (i + 1) + ": " + questions[i].question + "\n\n" +
      "Your answer: " + userAnswer + "\n" +
      "Correct answer: " + correctAnswer + "\n" +
      "Result: " + result + "\n" +
      "Explanation: " + questions[i].explanation + "\n\n" +
      "────────────────────────────────────────\n\n";
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
function submitQuiz() {
  const score = calculateScore();
  const percentage = calculatePercentage(score);
  const message = getPerformanceMessage(percentage);
  const correction = buildCorrection();
  showResults(score, percentage, message, correction);
}

function renderQuestion() {
  const q = questions[currentQuestion];

  // --------------------------------------------------
  // QUESTION NUMBER
  // --------------------------------------------------
  document.getElementById("progress").textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;

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
    // by the user.
    if (userAnswers[currentQuestion] === i) {
      radio.checked = true;
    }
    // When the user selects this answer,
    // save its index.
    radio.onclick = function () {
      saveAnswer(i);
    };
    label.appendChild(radio);
    label.appendChild(document.createTextNode(" " + q.choices[i]));
    choicesContainer.appendChild(label);
  }

  // --------------------------------------------------
  // NAVIGATION BUTTONS
  // --------------------------------------------------
  document.getElementById("firstBtn").disabled = currentQuestion === 0;
  document.getElementById("previousBtn").disabled = currentQuestion === 0;
  document.getElementById("nextBtn").disabled =
    currentQuestion === questions.length - 1;
  document.getElementById("lastBtn").disabled =
    currentQuestion === questions.length - 1;
}

// ======================================================
// DISPLAY RESULTS
// ======================================================
function showResults(score, percentage, message, correction) {
  document.getElementById("quizPanel").style.display = "none";
  document.getElementById("resultsPanel").style.display = "block";
  document.getElementById("scoreText").textContent =
    `Score: ${score} / ${questions.length}`;
  document.getElementById("percentageText").textContent =
    `Percentage: ${percentage}%`;
  document.getElementById("performanceText").textContent = message;
  document.getElementById("correction").textContent = correction;
}

// ======================================================
// START APPLICATION
// ======================================================
renderQuestion();
