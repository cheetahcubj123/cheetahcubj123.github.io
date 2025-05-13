let stateCapitalData = [];
let quizQuestions = [];
let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const feedback = document.getElementById("feedback");

// Load CSV data
fetch('states.csv')
  .then(response => response.text())
  .then(data => {
    parseCSV(data);
    generateQuizQuestions();
    startQuiz();
  });

// Parse CSV
function parseCSV(csv) {
  const lines = csv.trim().split("\n");
  lines.shift(); // remove header
  stateCapitalData = lines.map(line => {
    const [state, capital] = line.split(",");
    return { state: state.trim(), capital: capital.trim() };
  });
}

// Generate 10 quiz questions
function generateQuizQuestions() {
  const usedStates = new Set();

  while (quizQuestions.length < 10) {
    const index = Math.floor(Math.random() * stateCapitalData.length);
    const stateEntry = stateCapitalData[index];
    if (usedStates.has(stateEntry.state)) continue;

    usedStates.add(stateEntry.state);
    const correct = stateEntry.capital;

    // Get 3 wrong capitals
    const wrongAnswers = stateCapitalData
      .filter(entry => entry.capital !== correct)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map(entry => entry.capital);

    const options = [...wrongAnswers, correct].sort(() => 0.5 - Math.random());

    quizQuestions.push({
      question: `What is the capital of ${stateEntry.state}?`,
      answers: options,
      correct: correct
    });
  }
}

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
  const current = quizQuestions[currentQuestionIndex];
  questionElement.textContent = current.question;

  current.answers.forEach(answer => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.classList.add("btn");
    btn.addEventListener("click", () => selectAnswer(answer));
    answerButtons.appendChild(btn);
  });
}

function resetState() {
  nextButton.style.display = "none";
  feedback.textContent = "";
  answerButtons.innerHTML = "";
}

function selectAnswer(selectedAnswer) {
  const correctAnswer = quizQuestions[currentQuestionIndex].correct;
  if (selectedAnswer === correctAnswer) {
    feedback.textContent = "✅ Correct!";
    score++;
  } else {
    feedback.textContent = `❌ Incorrect.`;
  }

  Array.from(answerButtons.children).forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correctAnswer) {
      btn.style.backgroundColor = "#2ecc71";
    } else if (btn.textContent === selectedAnswer) {
      btn.style.backgroundColor = "#e74c3c";
    } else {
      btn.style.backgroundColor = "#bdc3c7";
    }
  });

  if (currentQuestionIndex < quizQuestions.length - 1) {
    nextButton.style.display = "inline-block";
  } else {
    restartButton.style.display = "inline-block";
    feedback.textContent += ` Final Score: ${score}/${quizQuestions.length}`;
  }
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  showQuestion();
});

restartButton.addEventListener("click", () => {
  quizQuestions = [];
  generateQuizQuestions();
  startQuiz();
});
