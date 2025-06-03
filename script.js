document.addEventListener('DOMContentLoaded', () => {
    const mainButtons = document.querySelectorAll('#main-nav button');
    // Funktion zum Anzeigen eines Bereichs und Ausblenden der anderen
    function showSection(sectionId) {
        document.querySelectorAll('.content-section').forEach(sec => sec.classList.add('hidden'));
        const section = document.getElementById(sectionId);
        if (section) section.classList.remove('hidden');
    }

    // Hauptnavigation: Klick-Handler
    mainButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            mainButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const target = btn.getAttribute('data-target');
            showSection(target);
        });
    });

    // Lernmaterial: Inhalte laden
    document.getElementById('btn-deutsch').addEventListener('click', () => {
        loadContent('lerninhalte.json', false);
    });
    document.getElementById('btn-urdu').addEventListener('click', () => {
        loadContent('urdu-content.json', true);
    });

    function loadContent(url, isUrdu) {
        const container = document.getElementById('lern-content');
        container.innerHTML = 'Lade Inhalte...';
        fetch(url)
            .then(response => response.json())
            .then(data => {
                container.innerHTML = '';
                // Urdu-Stil aktivieren oder entfernen
                if (isUrdu) {
                    container.classList.add('urdu');
                } else {
                    container.classList.remove('urdu');
                }
                // JSON erwartet Array von {title, content}
                data.forEach(item => {
                    const titleEl = document.createElement('h3');
                    titleEl.textContent = item.title;
                    container.appendChild(titleEl);
                    const contentEl = document.createElement('p');
                    contentEl.textContent = item.content;
                    container.appendChild(contentEl);
                });
            })
            .catch(err => {
                container.textContent = 'Fehler beim Laden der Inhalte.';
                console.error(err);
            });
    }

    // Themen-Quiz: Themenliste
    const topics = [
        { name: "Personenbeförderung", file: "quiz_personenbeförderung.json" },
        { name: "Gewerberecht", file: "quiz_gewerberecht.json" },
        { name: "Arbeitsrecht", file: "quiz_arbeitsrecht.json" },
        { name: "Straßenverkehrsrecht", file: "quiz_strassenverkehrsrecht.json" },
        { name: "Tarifrecht", file: "quiz_tarifrecht.json" },
        { name: "Verkehrspolizei", file: "quiz_verkehrspolizei.json" },
        { name: "Unfallverhütung", file: "quiz_unfallverhuetung.json" },
        { name: "Versicherung", file: "quiz_versicherung.json" },
        { name: "Steuerrecht", file: "quiz_steuerrecht.json" },
        { name: "Betriebswirtschaft", file: "quiz_betriebswirtschaft.json" },
        { name: "Umweltrecht", file: "quiz_umweltrecht.json" },
        { name: "Kundenservice", file: "quiz_kundenservice.json" },
        { name: "Fahrgastrecht", file: "quiz_fahrgastrecht.json" }
    ];
    const topicsList = document.getElementById('quiz-topics-list');
    const quizContainer = document.getElementById('quiz-container');

    // Buttons für jedes Thema erstellen
    topics.forEach(topic => {
        const btn = document.createElement('button');
        btn.textContent = topic.name;
        btn.addEventListener('click', () => {
            quizContainer.innerHTML = 'Lade Quiz...';
            fetch(topic.file)
                .then(response => response.json())
                .then(data => {
                    runQuiz(data, quizContainer);
                })
                .catch(err => {
                    quizContainer.textContent = 'Fehler beim Laden des Quiz.';
                    console.error(err);
                });
        });
        topicsList.appendChild(btn);
    });

    // Musterprüfungen
    document.getElementById('btn-load-muster').addEventListener('click', () => {
        const container = document.getElementById('muster-quiz-container');
        container.innerHTML = 'Lade Musterprüfung...';
        const num = Math.floor(Math.random() * 3) + 1;
        const file = `prüfung_0${num}.json`;
        fetch(encodeURI(file))
            .then(response => response.json())
            .then(data => {
                runExam(data, container);
            })
            .catch(err => {
                container.textContent = 'Fehler beim Laden der Prüfung.';
                console.error(err);
            });
    });

    // Standardmäßig ersten Bereich anzeigen
    document.getElementById('btn-lern').click();
});