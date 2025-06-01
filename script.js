// ✅ Show sections
function showSection(id) {
  document.querySelectorAll('.section').forEach(sec => sec.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

// ✅ اردو مواد کو ظاہر کرنے کا فنکشن (پہلے والا استعمال میں نہیں آ رہا، بعد میں ہٹایا جا سکتا ہے)
function showUrduContent() {
  const urduContent = [
    {
      title: "مثال",
      items: ["نکتہ ۱", "نکتہ ۲", "نکتہ ۳"]
    }
  ];

  const container = document.getElementById('urduContent');
  container.innerHTML = '';

  urduContent.forEach(section => {
    const sectionDiv = document.createElement('div');
    sectionDiv.className = 'urdu-section';
    sectionDiv.innerHTML = `
      <h3>${section.title}</h3>
      <ul>
        ${section.items.map(item => `<li>${item}</li>`).join('')}
      </ul>
    `;
    container.appendChild(sectionDiv);
  });

  showSection('lern');
  document.getElementById('urduContent').classList.remove('hidden');
}

// ✅ نیا فنکشن: Lernmaterial JSON لوڈ کرنا
function loadLernmaterial(lang) {
  let file = '';
  if (lang === 'de') {
    file = 'lerninhalte.json';
  } else if (lang === 'ur') {
    file = 'urdu-content.json';
  }

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
    })
    .catch(err => {
      console.error("❌ Fehler beim Laden von Lernmaterial:", err);
      alert("Lernmaterial konnte nicht geladen werden.");
    });
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

// ✅ Themen Quiz: 13 Topics anzeigen und Quiz laden
const topics = [
  "Personenbeförderung", "Gewerberecht", "Arbeitsrecht",
  "Kaufmännische und finanzielle Führung des Unternehmens", "Kostenrechnung", "Straßenverkehrsrecht",
  "Umweltschutz", "Versicherungswesen", "Technische Normen und technischer Betrieb",
  "Beförderungsentgelte und -bedingungen", "Mietwagen", "TesteDich", "Fallbeispiele"
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