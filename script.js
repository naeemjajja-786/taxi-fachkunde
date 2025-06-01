// ✅ Show sections
function showSection(id) {
  document.querySelectorAll('.section').forEach(sec => sec.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

// ✅ Toggle language content for Lernmaterial
function toggleLanguage(lang) {
  document.getElementById('content-urdu').classList.add('hidden');
  document.getElementById('content-de').classList.add('hidden');

  if (lang === 'urdu') {
    document.getElementById('content-urdu').classList.remove('hidden');
  } else {
    document.getElementById('content-de').classList.remove('hidden');
  }
}

// ✅ MathQuill Setup (optional placeholder)
window.onload = function () {
  if (document.getElementById('math-field')) {
    const MQ = MathQuill.getInterface(2);
    MQ.MathField(document.getElementById('math-field'), {
      spaceBehavesLikeTab: true
    });
  }
};

// ✅ Prüfung Starten: Zufällige Test-Datei laden
function startPruefung() {
  const testFiles = [
    "prüfung_01.json",
    "prüfung_02.json",
    "prüfung_03.json"
    // weitere Testdateien hier ergänzen
  ];

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

// ✅ Themen Quiz: 12 Topics anzeigen und Quiz laden
const topics = [
  "Personenbeförderung", "Gewerberecht", "Arbeitsrecht",
  "Kaufmännische und finanzielle Führung des Unternehmens", "Kostenrechnung", "Straßenverkehrsrecht",
  "Umweltschutz", "Versicherungswesen", "Technische Normen und technischer Betrieb",
  "Beförderungsentgelte und -bedingungen", "Mietwagen", "Teste Dich", "Fallbeispiele"
];

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById("topics-list");
  if (container && container.children.length === 0) {
    topics.forEach(topic => {
      const btn = document.createElement("button");
      btn.textContent = topic;
      btn.onclick = () => loadTopicQuiz(topic); // in quiz.js definiert
      container.appendChild(btn);
    });
  }
});
