let currentQuestionIndex = 0;
let currentQuiz = [];

function loadQuiz(jsonFile) {
  fetch(jsonFile)
    .then((res) => res.json())
    .then((data) => {
      currentQuiz = shuffleArray(data);
      currentQuestionIndex = 0;
      document.getElementById("quiz-container").innerHTML = "";
      showQuestion();
    });
}

function showQuestion() {
  const container = document.getElementById("quiz-container");
  container.innerHTML = "";

  if (currentQuestionIndex >= currentQuiz.length) {
    container.innerHTML = "<h3>🎉 Quiz beendet!</h3>";
    return;
  }

  const question = currentQuiz[currentQuestionIndex];

  const questionBox = document.createElement("div");
  questionBox.className = "content-box";
  questionBox.innerHTML = `<h4>Frage ${currentQuestionIndex + 1}:</h4>
    <p>${question.question}</p>`;

  const answersBox = document.createElement("div");
  answersBox.id = "answers-box";

  const shuffledAnswers = shuffleArray([...question.answers]);

  shuffledAnswers.forEach((ans, index) => {
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "answer";
    input.value = ans;
    label.appendChild(input);
    label.append(` ${ans}`);
    answersBox.appendChild(label);
  });

  const checkBtn = document.createElement("button");
  checkBtn.textContent = "✅ جواب چیک کریں";
  checkBtn.onclick = () => checkAnswer(question.correct, question.explanation_ur);

  const nextBtn = document.createElement("button");
  nextBtn.id = "next-button";
  nextBtn.textContent = "➡️ اگلا سوال";
  nextBtn.classList.add("hidden");
  nextBtn.onclick = () => {
    currentQuestionIndex++;
    showQuestion();
  };

  questionBox.appendChild(answersBox);
  questionBox.appendChild(checkBtn);
  questionBox.appendChild(nextBtn);
  container.appendChild(questionBox);
}

function checkAnswer(correctAnswer, explanationUr) {
  const selected = document.querySelector("input[name='answer']:checked");

  if (!selected) {
    alert("براہ کرم کوئی جواب منتخب کریں۔");
    return;
  }

  const isCorrect = selected.value === correctAnswer;
  const feedback = document.createElement("p");

  if (isCorrect) {
    feedback.innerHTML = "✅ درست جواب!";
    feedback.style.color = "green";
  } else {
    feedback.innerHTML = `❌ غلط جواب! درست جواب ہے: <b>${correctAnswer}</b>`;
    feedback.style.color = "red";
  }

  if (explanationUr) {
    const explain = document.createElement("p");
    explain.innerHTML = `<i>📘 وضاحت: ${explanationUr}</i>`;
    explain.style.color = "#333";
    feedback.appendChild(explain);
  }

  document.getElementById("answers-box").appendChild(feedback);
  document.querySelector("#next-button").classList.remove("hidden");
}

function shuffleArray(arr) {
  return arr
    .map((item) => ({ sort: Math.random(), value: item }))
    .sort((a, b) => a.sort - b.sort)
    .map((obj) => obj.value);
}