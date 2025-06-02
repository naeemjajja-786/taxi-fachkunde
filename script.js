document.addEventListener("DOMContentLoaded", () => {
  const sections = {
    lernmaterial: document.getElementById("lernmaterial-section"),
    themenquiz: document.getElementById("themenquiz-section"),
    mathe: document.getElementById("mathe-section"),
    musterpruefung: document.getElementById("musterpruefung-section")
  };

  const mainButtons = {
    lernmaterial: document.getElementById("btn-lernmaterial"),
    themenquiz: document.getElementById("btn-themenquiz"),
    mathe: document.getElementById("btn-mathe"),
    musterpruefung: document.getElementById("btn-musterpruefung")
  };

  const showSection = (sectionKey) => {
    Object.values(sections).forEach(sec => sec.classList.add("hidden"));
    sections[sectionKey].classList.remove("hidden");
  };

  Object.entries(mainButtons).forEach(([key, button]) => {
    button.addEventListener("click", () => showSection(key));
  });

  // Deutsch / Urdu content loading
  document.getElementById("btn-deutsch").addEventListener("click", () => {
    fetch("lerninhalte.json")
      .then(res => res.json())
      .then(data => displayContent(data, "deutsch-content"));
  });

  document.getElementById("btn-urdu").addEventListener("click", () => {
    fetch("urdu-content.json")
      .then(res => res.json())
      .then(data => displayContent(data, "urdu-content"));
  });

  function displayContent(data, containerId) {
    const container = document.getElementById("lernmaterial-content");
    container.innerHTML = "";
    data.forEach(item => {
      const div = document.createElement("div");
      div.className = "content-box";
      div.innerHTML = `<h4>${item.title}</h4><p>${item.content}</p>`;
      container.appendChild(div);
    });
  }

  // Themen Quiz Topic Buttons
  const topics = [
    "personenbeförderung", "arbeitsrecht", "kaufmaennisch", "kostenrechnung",
    "strassenverkehrsrecht", "umweltschutz", "versicherungswesen",
    "technische-normen", "befoerderungsentgelte", "mietwagen",
    "gewerberecht", "rechtliche-rahmenbedingungen", "testedich"
  ];

  const topicContainer = document.getElementById("topics-list");
  topics.forEach(topic => {
    const btn = document.createElement("button");
    btn.textContent = topic.replace(/-/g, " ").toUpperCase();
    btn.addEventListener("click", () => {
      loadQuiz(`quiz_${topic}.json`);
    });
    topicContainer.appendChild(btn);
  });

  // Muster Prüfung
  const pruefungButtons = [
    { id: "btn-pruefung-1", file: "prüfung_01.json" },
    { id: "btn-pruefung-2", file: "prüfung-01.json" }
  ];

  pruefungButtons.forEach(({ id, file }) => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener("click", () => {
        loadQuiz(file);
      });
    }
  });
});