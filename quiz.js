let currentQuiz = [];
let currentQuestionIndex = 0;

function loadQuiz(jsonFile) {
  fetch(jsonFile)
    .then(res => {
      if (!res.ok) throw new Error("Quiz-Datei nicht gefunden: " + jsonFile);
      return res.json();
    })
    .then(data => {
      currentQuiz = shuffleArray(data);
      currentQuestionIndex = 0;
      document.getElementById("quiz-container").classList.remove("hidden");
      document.getElementById("feedback-box").innerHTML = "";
      showQuizQuestion();
    })
    .catch(err => {
      console.error(err);
      alert("Quiz-Datei nicht geladen: " + jsonFile);
    });
}

function showQuizQuestion() {
  const container = document.getElementById("quiz-container");
  container.classList.remove("hidden");

  if (currentQuestionIndex >= currentQuiz.length) {
    container.innerHTML = `<h3>🎉 Quiz abgeschlossen!</h3>`;
    return;
  }

  const q = currentQuiz[currentQuestionIndex];
  const questionBox = document.getElementById("question-box");
  questionBox.innerHTML = `<h4>Frage ${currentQuestionIndex + 1}:</h4><p>${q.frage}</p>`;

  const answersBox = document.getElementById("answers-box");
  answersBox.innerHTML = "";
  const shuffledAnswers = shuffleArray([...q.antworten]);

  shuffledAnswers.forEach(ansObj => {
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "answer";
    input.value = ansObj.text;
    label.appendChild(input);
    label.insertAdjacentText("beforeend", ` ${ansObj.text}`);
    answersBox.appendChild(label);
    answersBox.appendChild(document.createElement("br"));
  });

  document.getElementById("check-button").classList.remove("hidden");
  document.getElementById("next-button").classList.add("hidden");
  document.getElementById("feedback-box").innerHTML = "";
}

function checkAnswer() {
  const selected = document.querySelector("input[name='answer']:checked");
  if (!selected) {
    alert("Bitte wähle eine Antwort aus.");
    return;
  }

  const chosenText = selected.value;
  const correctText = currentQuiz[currentQuestionIndex].antworten.find(a => a.korrekt).text;
  const explanationUr = currentQuiz[currentQuestionIndex].erklärung_ur || "";

  const feedbackBox = document.getElementById("feedback-box");
  feedbackBox.innerHTML = "";
  if (chosenText === correctText) {
    feedbackBox.innerHTML = `<p style="color:green;">✅ Richtig!</p>`;
  } else {
    feedbackBox.innerHTML = `<p style="color:red;">❌ Falsch! Richtige Antwort: <b>${correctText}</b></p>`;
  }

  if (explanationUr) {
    feedbackBox.insertAdjacentHTML("beforeend", `<p><i>تفصیل: ${explanationUr}</i></p>`);
  }

  document.getElementById("next-button").classList.remove("hidden");
}

function nextQuestion() {
  currentQuestionIndex++;
  showQuizQuestion();
}

function shuffleArray(arr) {
  return arr
    .map(v => ({ sort: Math.random(), value: v }))
    .sort((a, b) => a.sort - b.sort)
    .map(obj => obj.value);
}