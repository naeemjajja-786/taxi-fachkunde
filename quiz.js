let quizData = [];
let currentQuestion = 0;
let currentTopic = "";

function loadTopicQuiz(topic) {
  currentTopic = topic;
  const file = `quiz-${topic}.json`;

  fetch(file)
    .then(res => res.json())
    .then(data => {
      quizData = data.sort(() => 0.5 - Math.random()).slice(0, 10);
      currentQuestion = 0;
      showQuestion();
    })
    .catch(err => {
      console.error("❌ Fehler beim Laden der Quizdatei:", err);
      alert("Quiz Datei nicht gefunden.");
    });
}

function showQuestion() {
  const quizContainer = document.getElementById("quiz-container");
  const questionBox = document.getElementById("question-box");
  const answersBox = document.getElementById("answers-box");
  const feedbackBox = document.getElementById("feedback");
  const nextButton = document.getElementById("next-button");

  quizContainer.classList.remove("hidden");
  document.getElementById("result-box").classList.add("hidden");

  const q = quizData[currentQuestion];
  questionBox.innerHTML = `<h3>Frage ${currentQuestion + 1}:</h3><p>${q.frage}</p>`;

  answersBox.innerHTML = "";
  q.antworten.forEach((ans, index) => {
    const label = document.createElement("label");
    label.innerHTML = `<input type="radio" name="answer" value="${index}"> ${ans}`;
    answersBox.appendChild(label);
    answersBox.appendChild(document.createElement("br"));
  });

  feedbackBox.innerHTML = "";
  nextButton.classList.add("hidden");

  const radios = answersBox.querySelectorAll("input[type=radio]");
  radios.forEach(r => r.addEventListener("change", () => checkAnswer(q.loesung)));
}

function checkAnswer(correctIndex) {
  const selected = document.querySelector("input[name=answer]:checked");
  const feedbackBox = document.getElementById("feedback");
  const nextButton = document.getElementById("next-button");

  if (!selected) return;

  const answerIndex = parseInt(selected.value);
  if (answerIndex === correctIndex) {
    feedbackBox.innerHTML = "✅ Richtig!";
    feedbackBox.style.color = "green";
  } else {
    feedbackBox.innerHTML = "❌ Falsch.";
    feedbackBox.style.color = "red";
  }

  nextButton.classList.remove("hidden");
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById("quiz-container").classList.add("hidden");
  const resultBox = document.getElementById("result-box");
  resultBox.classList.remove("hidden");
  resultBox.innerHTML = `
    <h3>Quiz beendet!</h3>
    <p>Du hast ${quizData.length} Fragen abgeschlossen.</p>
    <button onclick="loadTopicQuiz('${currentTopic}')">Nochmal starten</button>
  `;
}