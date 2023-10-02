const startButton = document.getElementById("start-button"); // a button for start quiz button;
const quizContainer = document.querySelector(".quiz-container"); //container of h2 with is questions
const questionElement = document.getElementById("question"); //h2 element question
const choicesElement = document.getElementById("choices"); //inside of container which is div
const resultElement = document.getElementById("result"); //inside of container result which is paragraph
const finalScoreElement = document.getElementById("final-score"); //inside of container div which is score container that containe p and side of p there is span final score
const initialsInput = document.getElementById("initials"); //this is the input
const submitScoreButton = document.getElementById("submit-score"); //a button for submit score
const timeElement = document.getElementById("time"); //time that count the result time

let currentQuestionIndex = 0;
let score = 0;
let time = 60; // Initial time in seconds
let timerInterval;

const questions = [
  {
    question: "What is JavaScript?",
    choices: [
      "A. A programming language",
      "B. A coffee brand",
      "C. A car manufacturer",
    ],
    correctAnswer: "A",
  },
  {
    question: "What does HTML stand for?",
    choices: [
      "A. Hyper Transfer Markup Language",
      "B. Hyper Text Markup Language",
      "C. Hotmail",
    ],
    correctAnswer: "B",
  },
  {
    question: "What does CSS stand for?",
    choices: [
      "A. Computer Style Sheets",
      "B. Creative Style Sheets",
      "C. Cascading Style Sheets",
    ],
    correctAnswer: "C",
  },
  {
    question: "What is a closure in JavaScript?",
    choices: [
      "A. A way to protect your code from external access",
      "B. A function inside another function that has access to the outer function's variables",
      "C. A type of data storage in JavaScript",
    ],
    correctAnswer: "B",
  },
];

startButton.addEventListener("click", startQuiz);
submitScoreButton.addEventListener("click", saveScore);

function startQuiz() {
  startButton.style.display = "none";
  quizContainer.style.display = "block";
  setTime();
  showQuestion(currentQuestionIndex);
}

function setTime() {
  timerInterval = setInterval(function () {
    time--;
    if (time <= 0) {
      endQuiz();
    }
    timeElement.textContent = "Time:" + time;
  }, 500);
}

function showQuestion(index) {
  if (index < questions.length) {
    const question = questions[index];
    questionElement.textContent = question.question;
    choicesElement.innerHTML = "";
    question.choices.forEach(function (choice) {
      const choiceButton = document.createElement("button");
      choiceButton.textContent = choice;
      choiceButton.addEventListener("click", function () {
        checkAnswer(choice.charAt(0), question.correctAnswer);
        console.log(choice.charAt(0));
      });
      choicesElement.appendChild(choiceButton);
    });
  } else {
    endQuiz();
  }
}

function checkAnswer(selectedChoice, correctAnswer) {
  if (selectedChoice === correctAnswer) {
    resultElement.textContent = "Correct!";
    score += 10;
  } else {
    resultElement.textContent = "Wrong!";
    time -= 10;
    if (time < 0) {
      time = 0;
    }
  }
  currentQuestionIndex++;
  showQuestion(currentQuestionIndex);
}

function endQuiz() {
  clearInterval(timerInterval);
  quizContainer.style.display = "none";
  resultElement.textContent = "";
  finalScoreElement.textContent = score;
  initialsInput.value = "";
  document.querySelector(".result-container").style.display = "block";
  document.querySelector(".score-container").style.display = "block";
}

function saveScore() {
  const initials = initialsInput.value.trim();
  if (initials !== "") {
    const currentDate = new Date().toLocaleDateString();
    saveHighScore(initials, score, currentDate);
    alert("Score saved!");
  }
}

// Define a function to save high scores to local storage
function saveHighScore(initials, score, date) {
  // Retrieve existing high scores from local storage or initialize an empty array
  let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  // Add the new score, initials, and date to the array
  highScores.push({ initials, score, date });

  // Sort the high scores in descending order by score
  highScores.sort(function (a, b) {
    return b.score - a.score;
  });

  // Store the updated high scores back in local storage
  localStorage.setItem("highScores", JSON.stringify(highScores));
}

// Add a function to display high scores
function displayHighScores() {
  // Retrieve high scores from local storage
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  // Create an HTML string to display high scores
  const highScoreList = document.querySelector("#high-score-list");
  highScoreList.innerHTML = "";
  highScores.forEach(function (entry, index) {
    const listItem = document.createElement("li");
    listItem.textContent = `${index + 1}. ${entry.initials} - ${
      entry.score
    } - ${entry.date}`;
    highScoreList.appendChild(listItem);
  });
}

// Call displayHighScores() to display high scores when needed
displayHighScores();
