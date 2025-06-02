// =========================================
// ۱) Main Section Switching
// =========================================
function showSection(key) {
  // پہلے سب سیکشنز چھپا دو
  document.querySelectorAll(".section").forEach(sec => {
    sec.classList.remove("visible");
    sec.classList.add("hidden");
  });

  // پھر مطلوبہ سیکشن دکھاؤ
  const sectionId = key + "-section";
  const sectionEl = document.getElementById(sectionId);
  if (sectionEl) {
    sectionEl.classList.remove("hidden");
    sectionEl.classList.add("visible");
  }

  // اگر موضوع Quiz نہیں ہے تو Quiz reset کر دو
  if (key !== "themenquiz") {
    resetQuiz();
  }
}

// =========================================
// ۲) Lernmaterial میں Deutsch / Urdu مواد لوڈ کرنا
// =========================================
function loadGermanContent() {
  fetch("lerninhalt.json")
    .then(res => {
      if (!res.ok) throw new Error("Datei lerninhalt.json nicht gefunden.");
      return res.json();
    })
    .then(data => {
      const container = document.getElementById("lernmaterial-content");
      container.innerHTML = "";
      data.forEach(section => {
        const div = document.createElement("div");
        div.className = "content-box";
        div.innerHTML = `<h4>${section.title}</h4><p>${section.content}</p>`;
        container.appendChild(div);
      });
      container.classList.remove("urdu-content");
    })
    .catch(err => {
      console.error(err);
      alert("Fehler beim Laden des deutschen Lernmaterials.");
    });
}

function loadUrduContent() {
  fetch("urdu-content.json")
    .then(res => {
      if (!res.ok) throw new Error("Datei urdu-content.json nicht gefunden.");
      return res.json();
    })
    .then(data => {
      const container = document.getElementById("lernmaterial-content");
      container.innerHTML = "";
      data.forEach(section => {
        const div = document.createElement("div");
        div.className = "content-box urdu-content";
        div.innerHTML = `<h4>${section.title}</h4><p>${section.content}</p>`;
        container.appendChild(div);
      });
    })
    .catch(err => {
      console.error(err);
      alert("خطا: اردو مواد لوڈ نہیں ہو سکا۔");
    });
}

// =========================================
// ۳) Muster Prüfung بٹنز کے لیے JSON لوڈ کرنا
// =========================================
function loadPruefung(jsonFile) {
  fetch(jsonFile)
    .then(res => {
      if (!res.ok) throw new Error("Prüfung Datei nicht gefunden.");
      return res.json();
    })
    .then(data => {
      const container = document.getElementById("pruefung-container");
      container.innerHTML = "";
      data.forEach((item, idx) => {
        const div = document.createElement("div");
        div.className = "content-box";
        div.innerHTML = `<p><b>Frage ${idx + 1}:</b> ${item.frage}</p>
          ${item.antworten.map((a, i) => 
            `<label><input type="radio" name="pruefung_q${idx}" value="${i}"> ${a}</label><br>`
          ).join("")}`;
        container.appendChild(div);
      });
    })
    .catch(err => {
      console.error(err);
      alert("Fehler beim Laden der Prüfungsdatei.");
    });
}

// =========================================
// ۴) Themen Quiz کے Topic Buttons بنانا
// =========================================
document.addEventListener("DOMContentLoaded", () => {
  const topics = [
    "personenbeförderung",
    "gewerberecht",
    "arbeitsrecht",
    "kaufmaennische",
    "kostenrechnung",
    "strassenverkehrsrecht",
    "umweltschutz",
    "versicherungswesen",
    "technische_normen",
    "befoerderungsentgelte",
    "mietwagen",
    "testedich",
    "fallbeispiele"
  ];

  const topicContainer = document.getElementById("topics-list");
  topics.forEach(topic => {
    const btn = document.createElement("button");
    btn.textContent = topic.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
    btn.onclick = () => loadQuiz(`quiz_${topic}.json`);
    topicContainer.appendChild(btn);
  });
});

// =========================================
// ۵) Quiz Logic (Delegated to quiz.js)
// =========================================
// quiz.js میں لکھا ہوا ان تمام فنکشنز کو یہاں استعمال کیا جائے گا

// جب Quiz سیکشن دکھاؤں تو container کی کلاس بدل دو
function resetQuiz() {
  const quizContainer = document.getElementById("quiz-container");
  const feedbackBox = document.getElementById("feedback-box");
  document.getElementById("question-box").innerHTML = "";
  document.getElementById("answers-box").innerHTML = "";
  document.getElementById("feedback-box").innerHTML = "";
  document.getElementById("check-button").classList.add("hidden");
  document.getElementById("next-button").classList.add("hidden");
  if (quizContainer) {
    quizContainer.classList.add("hidden");
  }
}