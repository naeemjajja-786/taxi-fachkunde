// ✅ Quiz Topic → File Mapping
const topicFileMap = {
  "Personenbeförderung": "quiz_personenbefoerderung.json",
  "Gewerberecht": "quiz_gewerberecht.json",
  "Arbeitsrecht": "quiz_arbeitsrecht.json",
  "Kaufmännische und finanzielle Führung des Unternehmens": "quiz_kfm_fuehrung.json",
  "Kostenrechnung": "quiz_kostenrechnung.json",
  "Straßenverkehrsrecht": "quiz_strassenverkehrsrecht.json",
  "Umweltschutz": "quiz_umweltschutz.json",
  "Versicherungswesen": "quiz_versicherungswesen.json",
  "Technische Normen und technischer Betrieb": "quiz_techn_betrieb.json",
  "Beförderungsentgelte und -bedingungen": "quiz_befoerderungsbedingungen.json",
  "Mietwagen": "quiz_mietwagen.json",
  "TesteDich": "quiz_testedich.json",
  "Fallbeispiele": "quiz_fallbeispiele.json"
};

// ✅ Quiz laden nach Topic
let currentQuestions = [];
let currentIndex = 0;
let score = 0;

function loadTopicQuiz(topic) {
  const filename = topicFileMap[topic];
  if (!filename) {
    alert("❌ Keine passende Datei gefunden.");
    return;
  }

  fetch(filename)
    .then(res => res.json())
    .then(data => {
      currentQuestions = shuffleArray(data).slice(0, 15); // max 15 Fragen
      currentIndex = 0;
      score = 0;
      document.getElementById("quiz-container").classList.remove("hidden");
      document.getElementById("result-box").classList.add("hidden");
      showQuestion();
    })
    .catch(() => alert("❌ Quiz Datei nicht gefunden."));
}

// ✅ Frage anzeigen
function showQuestion() {
  const q = currentQuestions[currentIndex];
  const container = document.getElementById("question-box");
  container.innerHTML = `
    <p><b>Frage ${currentIndex + 1}:</b> ${q.frage}</p>
    ${q.antworten.map((a, i) => `
      <label><input type="radio" name="antwort" value="${i}"> ${a}</label><br>`).join('')}
    <button onclick="checkAnswer()">Antwort prüfen</button>
  `;
}

// ✅ Antwort prüfen
function checkAnswer() {
  const selected = document.querySelector('input[name="antwort"]:checked');
  if (!selected) {
    alert("Bitte eine Antwort auswählen.");
    return;
  }

  const answer = parseInt(selected.value);
  const correct = currentQuestions[currentIndex].loesung;

  if (answer === correct) {
    score++;
    alert("✅ Richtig!");
  } else {
    alert(`❌ Falsch. Richtige Antwort: ${currentQuestions[currentIndex].antworten[correct]}`);
  }

  currentIndex++;
  if (currentIndex < currentQuestions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

// ✅ Ergebnis anzeigen
function showResult() {
  document.getElementById("quiz-container").classList.add("hidden");
  const resultBox = document.getElementById("result-box");
  resultBox.classList.remove("hidden");
  resultBox.innerHTML = `<h3>Ergebnis</h3><p>Du hast ${score} von ${currentQuestions.length} richtig beantwortet.</p>`;
}

// ✅ Hilfsfunktion: Shuffle Array
function shuffleArray(arr) {
  return arr
    .map((val) => ({ val, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ val }) => val);
}