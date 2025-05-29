// script.js

// 1) Section دکھانے کا فنکشن
function showSection(id) {
  document.querySelectorAll('.section')
    .forEach(s => s.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

// 2) Lernmaterial کے لیے زبان کی toggle
function toggleLanguage(lang) {
  document.getElementById('content-urdu').classList.add('hidden');
  document.getElementById('content-de').classList.add('hidden');
  if (lang === 'urdu')    document.getElementById('content-urdu').classList.remove('hidden');
  else if (lang === 'de') document.getElementById('content-de').classList.remove('hidden');
}

// 3) MathQuill Initialization
window.onload = () => {
  // MathQuill سیٹ اپ
  const MQ = MathQuill.getInterface(2);
  MQ.MathField(document.getElementById('math-field'), {
    spaceBehavesLikeTab: true
  });

  // placeholder: بعد میں questions append کریں
  // loadMathQuestions();
};

// 4) Quiz کے موجودہ دو سوالات (بعد میں JSON لوڈ کر کے merge کریں)
const quizData = [
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
  container.innerHTML = '';  // reset
  quizData.forEach((q, i) => {
    const div = document.createElement("div");
    div.innerHTML = `<p><b>Frage ${i+1}:</b> ${q.frage}</p>` +
      q.antworten.map((a,j)=>
        `<label><input type="radio" name="q${i}" value="${j}"> ${a}</label><br>`
      ).join("");
    container.appendChild(div);
  });
}

function showQuizResult() {
  let correct = 0;
  quizData.forEach((q,i)=>{
    const sel = document.querySelector(`input[name=q${i}]:checked`);
    if (sel && +sel.value === q.korrekt) correct++;
  });
  const res = document.getElementById("quiz-result");
  res.innerHTML = `<p>Ergebnis: ${correct} / ${quizData.length}</p>`;
  quizData.forEach((q,i)=>{
    res.innerHTML += `<p><b>Frage ${i+1}:</b> ${q.erklaerung}</p>`;
  });
}

// 5) Prüfung Starten: testFiles سے Random JSON لوڈ کرنا
const testFiles = [
  "test_01.json",
  "test_02.json",
  "test_taxi_pruefung_1.json"
];

function startPruefung() {
  const file = testFiles[Math.floor(Math.random()*testFiles.length)];
  fetch(file)
    .then(r=>r.json())
    .then(data=>{
      renderTest(data);
    })
    .catch(e=>{
      alert("Test لوڈ کرنے میں مسئلہ: " + e);
    });
}

// test.json کو render کرنے کا basic فنکشن
function renderTest(data) {
  const container = document.getElementById("test-container");
  container.innerHTML = '';
  data.forEach((q,i)=>{
    const div = document.createElement("div");
    div.classList.add("question");
    div.innerHTML = `<p><b>Q${i+1}:</b> ${q.frage}</p>` +
      q.antworten.map((a,j)=>
        `<label><input type="radio" name="tq${i}" value="${j}"> ${a}</label><br>`
      ).join("") +
      `<button onclick="checkTestAnswer(${i}, ${q.korrekt})">Antwort prüfen</button>` +
      `<span id="tresult${i}"></span>`;
    container.appendChild(div);
  });
}

function checkTestAnswer(qIndex, kor) {
  const sel = document.querySelector(`input[name=tq${qIndex}]:checked`);
  const span = document.getElementById(`tresult${qIndex}`);
  if (!sel) {
    span.textContent = " آپ نے جواب نہیں دیا!";
    return;
  }
  span.textContent = (+sel.value===kor) ? "✅ درست!" : "❌ غلط!";
}
