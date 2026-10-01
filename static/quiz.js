// ======================================================
// QUESTIONS
// ======================================================
const questions = [ // Populate this array with question objects as needed.
// Each question object should have the following structure:
  {
     question: "In which year was ARPANET first established?",
        choices: [
            "1965",
            "1969",
            "1973",
            "1983"
        ],
        answer: 1,
        explanation: "ARPANET was established in 1969 and became an important starting point for the development of the Internet."
    },

    {
        question: "Who sent the first networked email using ARPANET?",
        choices: [
            "Tim Berners-Lee",
            "Vint Cerf",
            "Ray Tomlinson",
            "Bob Kahn"
        ],
        answer: 2,
        explanation: "Ray Tomlinson sent the first networked email in 1971 using ARPANET."
    },

    {
        question: "What happened to ARPANET in 1983?",
        choices: [
            "It was replaced by the World Wide Web",
            "It changed from NCP to TCP/IP",
            "It was shut down",
            "It introduced DNS"
        ],
        answer: 1,
        explanation: "On January 1, 1983, ARPANET changed from NCP to TCP/IP."
    },

    {
        question: "What was the main purpose of DNS?",
        choices: [
            "To create web pages",
            "To send emails",
            "To connect domain names with IP addresses",
            "To encrypt websites"
        ],
        answer: 2,
        explanation: "DNS connects domain names to numerical IP addresses, making the Internet easier to use."
    },

    {
        question: "What was NSFNET originally created to connect?",
        choices: [
            "Mobile phones",
            "Researchers with supercomputer centers",
            "Web browsers",
            "Email servers"
        ],
        answer: 1,
        explanation: "NSFNET was launched to connect researchers with supercomputer centers and later became an important Internet backbone."
    },

    {
        question: "In which year was the original ARPANET officially shut down?",
        choices: [
            "1983",
            "1986",
            "1990",
            "1995"
        ],
        answer: 2,
        explanation: "The original ARPANET was officially shut down in 1990."
    },

    {
        question: "Who proposed the World Wide Web in 1989?",
        choices: [
            "Ray Tomlinson",
            "Tim Berners-Lee",
            "Vint Cerf",
            "Bob Kahn"
        ],
        answer: 1,
        explanation: "Tim Berners-Lee proposed the World Wide Web in 1989."
    },

    {
        question: "Which technology was developed as one of the core technologies of the early Web?",
        choices: [
            "HTML",
            "DNS",
            "ARPANET",
            "Wi-Fi"
        ],
        answer: 0,
        explanation: "HTML was one of the core technologies developed for the World Wide Web."
    },

    {
        question: "What was Mosaic important for?",
        choices: [
            "It helped make the Web more accessible to users",
            "It replaced TCP/IP",
            "It created ARPANET",
            "It introduced email"
        ],
        answer: 0,
        explanation: "The Mosaic browser helped make the World Wide Web more accessible and popular."
    },

    {
        question: "What organization was created in 1994 to help develop Web standards?",
        choices: [
            "DARPA",
            "NSF",
            "W3C",
            "ITU"
        ],
        answer: 2,
        explanation: "The World Wide Web Consortium (W3C) was founded in 1994 to help develop Web standards."
    },

    {
        question: "Which two technologies became important parts of Web development during the 1990s?",
        choices: [
            "JavaScript and CSS",
            "DNS and ARPANET",
            "TCP and NSFNET",
            "Wi-Fi and 5G"
        ],
        answer: 0,
        explanation: "JavaScript and CSS became important technologies for adding behavior and styling to Web pages."
    },

    {
        question: "What does HTML mainly describe?",
        choices: [
            "The structure of a Web page",
            "The physical Internet cables",
            "The IP address of a server",
            "The speed of a network"
        ],
        answer: 0,
        explanation: "HTML is used to structure the content of Web pages."
    },

    {
        question: "What is the main purpose of CSS?",
        choices: [
            "To assign IP addresses",
            "To style and present Web pages",
            "To send email",
            "To create domain names"
        ],
        answer: 1,
        explanation: "CSS is used to control the presentation and appearance of Web pages."
    },

    {
        question: "What is the main purpose of JavaScript on the Web?",
        choices: [
            "To replace HTML",
            "To provide interactivity and dynamic behavior",
            "To create IP addresses",
            "To connect physical networks"
        ],
        answer: 1,
        explanation: "JavaScript is mainly used to add interactivity and dynamic behavior to Web pages."
    },

    {
        question: "What is the main difference between the Internet and the Web?",
        choices: [
            "They are exactly the same thing",
            "The Internet is the network infrastructure, while the Web is a service that uses it",
            "The Web existed before the Internet",
            "The Internet is only used for websites"
        ],
        answer: 1,
        explanation: "The Internet is the global network infrastructure, while the Web is a system of interconnected resources that operates over the Internet."
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
