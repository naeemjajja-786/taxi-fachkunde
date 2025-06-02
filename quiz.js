
let currentQuiz = [];
let currentQuestionIndex = 0;

function loadQuiz(quizData) {
  currentQuiz = quizData;
  currentQuestionIndex = 0;
  document.getElementById('quiz-container').classList.remove('hidden');
  document.getElementById('result-box').classList.add('hidden');
  showQuestion();
}

function showQuestion() {
  const q = currentQuiz[currentQuestionIndex];
  document.getElementById('question-box').innerText = q.frage;
  const answersBox = document.getElementById('answers-box');
  answersBox.innerHTML = '';
  q.antworten.forEach((ans, idx) => {
    const btn = document.createElement('button');
    btn.innerText = ans.text;
    btn.onclick = () => selectAnswer(idx);
    answersBox.appendChild(btn);
  });
  document.getElementById('feedback').innerText = '';
  document.getElementById('next-button').classList.add('hidden');
}

function selectAnswer(selectedIdx) {
  const correct = currentQuiz[currentQuestionIndex].antworten[selectedIdx].korrekt;
  const feedback = document.getElementById('feedback');
  feedback.innerText = correct ? "Richtig â" : "Falsch â";
  document.getElementById('next-button').classList.remove('hidden');
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < currentQuiz.length) {
    showQuestion();
  } else {
    document.getElementById('quiz-container').classList.add('hidden');
    document.getElementById('result-box').classList.remove('hidden');
    document.getElementById('result-box').innerText = "Quiz abgeschlossen!";
  }
}
