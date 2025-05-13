const questions = [
  {
    question: "What is the capital of France?",
    answers: ["Paris", "Madrid", "Berlin", "Rome"],
    correct: 0
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: ["Earth", "Saturn", "Mars", "Venus"],
    correct: 2
  },
  {
    question: "What is the boiling point of water?",
    answers: ["90°C", "100°C", "110°C", "120°C"],
    correct: 1
  },
  {
    question: "Which ocean is the largest?",
    answers: ["Atlantic", "Pacific", "Indian", "Arctic"],
    correct: 1
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    answers: ["Shakespeare", "Hemingway", "Dickens", "Orwell"],
    correct: 0
  },
  {
    question: "Which language is used to style web pages?",
    answers: ["HTML", "CSS", "JavaScript", "Python"],
    correct: 1
  },
  {
    question: "What is the chemical symbol for Gold?",
    answers: ["Ag", "Au", "Gd", "Go"],
    correct: 1
  },
  {
    question: "Which number is the smallest prime?",
    answers: ["0", "1", "2", "3"],
    correct: 2
  },
  {
    question: "What year did World War II end?",
    answers: ["1942", "1945", "1948", "1950"],
    correct: 1
  },
  {
    question: "Which continent is Egypt part of?",
    answers: ["Asia", "Europe", "Africa", "South America"],
    correct: 2
  }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const feedback = document.getElementById("feedback");

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  restartButton.style.display = "none";
  nextButton.style.display = "none";
  feedback.textContent = "";
  showQuestion();
}

function showQuestion() {
  resetState();
  const current = questions[currentQuestionIndex];
  questionElement.textContent = current.question;

  current.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.classList.add("btn");
    btn.addEventListener("click", () => selectAnswer(index));
    answerButtons.appendChild(btn);
  });
}

function resetState() {
  nextButton.style.display = "none";
  feedback.textContent = "";
  answerButtons.innerHTML = "";
}

function selectAnswer(selectedIndex) {
  const correctIndex = questions[currentQuestionIndex].correct;
  if (selectedIndex === correctIndex) {
    feedback.textContent = "✅ Correct!";
    score++;
  } else {
    feedback.textContent = "❌ Incorrect.";
  }

  Array.from(answerButtons.children).forEach((btn, index) => {
    btn.disabled = true;
    if (index === correctIndex) {
      btn.style.backgroundColor = "#2ecc71";
    } else if (index === selectedIndex) {
      btn.style.backgroundColor = "#e74c3c";
    } else {
      btn.style.backgroundColor = "#bdc3c7";
    }
  });

  if (currentQuestionIndex < questions.length - 1) {
    nextButton.style.display = "inline-block";
  } else {
    restartButton.style.display = "inline-block";
    feedback.textContent += ` Final Score: ${score}/${questions.length}`;
  }
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  showQuestion();
});

restartButton.addEventListener("click", startQuiz);

startQuiz();
