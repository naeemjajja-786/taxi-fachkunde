let currentQuestions = [];
let currentIndex = 0;
let score = 0;

function loadTopicQuiz(topic) {
  const filename = `quiz_${topic.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss').replace(/[^a-z0-9]/gi, '_')}.json`;

  fetch(filename)
    .then(res => res.json())
    .then(data => {
      currentQuestions = shuffleArray(data).slice(0, 15);
      currentIndex = 0;
      score = 0;
      document.getElementById("quiz-container").classList.remove("hidden");
      document.getElementById("result-box").classList.add("hidden");
      showQuestion();
    })
    .catch(() => alert("Quiz Datei nicht gefunden."));
}

function showQuestion() {
  const q = currentQuestions[currentIndex];
  document.getElementById("feedback").innerHTML = '';
  document.getElementById("next-button").classList.add("hidden");

  document.getElementById("question-box").innerHTML =
    `<h3>Frage ${currentIndex + 1}:</h3><p>${q.frage}</p>`;

  const answersHTML = shuffleArray(q.antworten).map((a, i) => `
    <label><input type="radio" name="answer" value="${a}"> ${a}</label><br>`).join("");

  document.getElementById("answers-box").innerHTML = answersHTML;

  document.querySelectorAll('input[name="answer"]').forEach(input => {
    input.onclick = () => {
      const correctAnswer = q.antworten[q.korrekt];
      const selected = input.value;
      const feedback = selected === correctAnswer ? "✅ Richtig!" : "❌ Falsch!";
      document.getElementById('feedback').innerHTML =
        `${feedback}<br><i>${q.erklaerung}</i>`;
      if (selected === correctAnswer) score++;
      document.getElementById('next-button').classList.remove('hidden');
      document.querySelectorAll('input[name="answer"]').forEach(i => i.disabled = true);
    };
  });
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex < currentQuestions.length) {
    showQuestion();
  } else {
    document.getElementById("quiz-container").classList.add("hidden");
    document.getElementById("result-box").classList.remove("hidden");
    document.getElementById("result-box").innerHTML =
      `<h3>Quiz beendet</h3><p>Du hast ${score} von ${currentQuestions.length} Fragen richtig beantwortet.</p>`;
  }
}

function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}
