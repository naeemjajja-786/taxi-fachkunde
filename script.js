function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

// MathQuill Setup
window.onload = function () {
  const MQ = MathQuill.getInterface(2);
  MQ.MathField(document.getElementById('math-field'), {
    spaceBehavesLikeTab: true
  });

  loadQuiz();
};

// Quiz Data
const quiz = [
  {
    frage: "Wie hoch ist der gesetzliche MwSt-Satz für innerstädtische Fahrten?",
    antworten: ["19%", "7%", "0%"],
    korrekt: 1,
    erklaerung: "اردو: شہر کے اندر ٹیکسی کرایہ پر 7% سیلز ٹیکس لاگو ہوتا ہے۔"
  },
  {
    frage: "Was tun bei Taxameter-Ausfall?",
    antworten: ["Einfach weiterfahren", "Fahrgast informieren", "Schätzen"],
    korrekt: 1,
    erklaerung: "اردو: ٹیکسی میٹر خراب ہو تو مسافر کو فوراً اطلاع دینا ضروری ہے۔"
  }
];

function loadQuiz() {
  const container = document.getElementById("quiz-container");
  quiz.forEach((q, i) => {
    const div = document.createElement("div");
    div.innerHTML = `<p><b>Frage ${i + 1}:</b> ${q.frage}</p>` +
      q.antworten.map((a, j) =>
        `<label><input type="radio" name="q${i}" value="${j}"> ${a}</label><br>`).join("");
    container.appendChild(div);
  });
}

function showResult() {
  let correct = 0;
  quiz.forEach((q, i) => {
    const selected = document.querySelector(`input[name=q${i}]:checked`);
    if (selected && parseInt(selected.value) === q.korrekt) correct++;
  });
  const result = document.getElementById("result");
  result.innerHTML = `<p>Ergebnis: ${correct} von ${quiz.length}</p>`;
  quiz.forEach((q, i) => {
    result.innerHTML += `<p><b>Frage ${i + 1}:</b> ${q.erklaerung}</p>`;
  });
}