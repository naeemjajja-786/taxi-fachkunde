// Funktion zum Anzeigen eines bestimmten Abschnitts
function showSection(sectionId) {
  // Verstecke Hauptmenü und alle Abschnitte
  document.getElementById('main-menu').style.display = 'none';
  document.querySelectorAll('.section').forEach(sec => {
    sec.style.display = 'none';
  });
  // Zeige den ausgewählten Abschnitt
  document.getElementById(sectionId).style.display = 'flex';
}

// Event-Handler für Hauptmenü-Buttons
document.getElementById('btn-lernmaterial').addEventListener('click', () => {
  showSection('lernmaterial-section');
});
document.getElementById('btn-themenquiz').addEventListener('click', () => {
  showSection('themenquiz-section');
});
document.getElementById('btn-matheeingabe').addEventListener('click', () => {
  showSection('mathe-section');
});
document.getElementById('btn-musterpruefungen').addEventListener('click', () => {
  showSection('muster-section');
});

// Lernmaterial: Lade jeweilige JSON-Datei und zeige Inhalte
function loadLernmaterial(datei) {
  fetch(datei)
    .then(response => response.json())
    .then(data => {
      const contentDiv = document.getElementById('lernmaterial-content');
      contentDiv.innerHTML = '';
      // Falls JSON ein Array ist
      if (Array.isArray(data)) {
        data.forEach(item => {
          contentDiv.innerHTML += `<h3>${item.title || ''}</h3><p>${item.content || ''}</p>`;
        });
      } else {
        // Objekt oder Schlüssel-Wert-Paar
        for (const key in data) {
          contentDiv.innerHTML += `<h3>${key}</h3><p>${data[key]}</p>`;
        }
      }
    })
    .catch(err => {
      console.error('Fehler beim Laden des Lernmaterials:', err);
    });
}

// Event-Handler für Lernmaterial-Buttons
document.getElementById('btn-deutsch').addEventListener('click', () => {
  loadLernmaterial('lerninhalte.json');
});
document.getElementById('btn-urdu').addEventListener('click', () => {
  loadLernmaterial('urdu-content.json');
});

// Themen Quiz: Event-Handler für Topic-Buttons
document.querySelectorAll('.topic-btn').forEach(button => {
  button.addEventListener('click', () => {
    const fileName = button.getAttribute('data-file');
    fetch(fileName)
      .then(response => response.json())
      .then(data => {
        // JSON könnte Fragen direkt enthalten oder als 'questions'-Array
        const questions = data.questions || data;
        const container = document.getElementById('topic-quiz-container');
        startQuiz(questions, container);
      })
      .catch(err => {
        console.error('Fehler beim Laden der Themenquiz-Datei:', err);
      });
  });
});

// Muster Prüfungen: Zufällige Prüfung laden
document.getElementById('btn-start-muster').addEventListener('click', () => {
  const files = ['prufung_01.json', 'prufung_02.json', 'prufung_03.json'];
  const randomFile = files[Math.floor(Math.random() * files.length)];
  fetch(randomFile)
    .then(response => response.json())
    .then(data => {
      const questions = data.questions || data;
      const container = document.getElementById('prufung-quiz-container');
      startQuiz(questions, container);
    })
    .catch(err => {
      console.error('Fehler beim Laden der Prüfungsdatei:', err);
    });
});