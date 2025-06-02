// ✅ Show sections
function showSection(id) {
  document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
  document.getElementById(id).classList.add('active');

  // Reset Quiz if not in "themen"
  if (id !== 'themen') {
    resetQuiz();
  }
}

// ✅ Lernmaterial JSON لوڈ کرنا
function loadLernmaterial(lang) {
  let file = lang === 'de' ? 'lerninhalte.json' : 'urdu-content.json';

  fetch(file)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('lernContent');
      container.innerHTML = '';

      data.forEach(section => {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'lern-section';
        sectionDiv.innerHTML = `
          <h3>${section.title}</h3>
          <ul>
            ${section.items.map(item => `<li>${item}</li>`).join('')}
          </ul>
        `;
        container.appendChild(sectionDiv);
      });

      if (lang === 'ur') {
        container.classList.add('urdu-content');
      } else {
        container.classList.remove('urdu-content');
      }

    })
    .catch(err => {
      console.error("❌ Fehler beim Laden von Lernmaterial:", err);
      alert("Lernmaterial konnte nicht geladen werden.");
    });
}

// ✅ MathQuill Setup (optional)
window.onload = function () {
  if (document.getElementById('math-field') && typeof MathQuill !== 'undefined') {
    const MQ = MathQuill.getInterface(2);
    MQ.MathField(document.getElementById('math-field'), {
      spaceBehavesLikeTab: true
    });
  }
};

// ✅ Prüfung Starten
function startPruefung() {
  const testFiles = ["prüfung_01.json", "prüfung_02.json", "prüfung_03.json"];
  const randomFile = testFiles[Math.floor(Math.random() * testFiles.length)];

  fetch(randomFile)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("test-container");
      container.innerHTML = '';
      data.forEach((q, i) => {
        const div = document.createElement("div");
        div.innerHTML = `
          <p><b>Frage ${i + 1}:</b> ${q.frage}</p>
          ${q.antworten.map((a, j) => `
            <label><input type="radio" name="q${i}" value="${j}"> ${a}</label><br>`).join('')}
        `;
        container.appendChild(div);
      });
    })
    .catch(() => alert("❌ Fehler beim Laden der Prüfungsdatei."));
}

// ✅ Reset Quiz UI
function resetQuiz() {
  const quizContainer = document.getElementById("quiz-container");
  const resultBox = document.getElementById("result-box");
  if (quizContainer) quizContainer.classList.add("hidden");
  if (resultBox) resultBox.classList.add("hidden");
}