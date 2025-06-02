/**
 * Startet ein Quiz mit den gegebenen Fragen im angegebenen Container.
 * Erwarte ein Array von Fragen. Jede Frage sollte die Struktur haben:
 * { question: 'Frage...', answers: ['Antwort A', 'Antwort B', ...], correctAnswer: 0 }
 */
function startQuiz(questions, container) {
  let currentQuestionIndex = 0;
  container.innerHTML = '';
  
  // Funktion zur Anzeige einer Frage
  function showQuestion() {
    container.innerHTML = '';
    if (currentQuestionIndex < questions.length) {
      const q = questions[currentQuestionIndex];
      
      // Frage anzeigen
      const questionEl = document.createElement('h3');
      questionEl.textContent = q.question || q.Frage || '';
      container.appendChild(questionEl);
      
      // Antwortmöglichkeiten
      const answersDiv = document.createElement('div');
      if (q.answers && Array.isArray(q.answers)) {
        q.answers.forEach((ansText, i) => {
          const label = document.createElement('label');
          const radio = document.createElement('input');
          radio.type = 'radio';
          radio.name = 'answer';
          radio.value = i;
          label.appendChild(radio);
          label.appendChild(document.createTextNode(ansText));
          answersDiv.appendChild(label);
        });
      }
      container.appendChild(answersDiv);
      
      // Ergebnisnachricht
      const resultMsg = document.createElement('p');
      container.appendChild(resultMsg);
      
      // "Antwort prüfen" Button
      const checkButton = document.createElement('button');
      checkButton.textContent = 'Antwort prüfen';
      container.appendChild(checkButton);
      
      // "Nächste Frage" Button (zuerst versteckt)
      const nextButton = document.createElement('button');
      nextButton.textContent = 'Nächste Frage';
      nextButton.style.display = 'none';
      container.appendChild(nextButton);
      
      // Ereignis beim Prüfen der Antwort
      checkButton.addEventListener('click', () => {
        const selected = container.querySelector('input[name="answer"]:checked');
        if (!selected) {
          alert('Bitte wähle eine Antwort aus.');
          return;
        }
        const answerIndex = parseInt(selected.value);
        // Prüfen der Antwort
        if (answerIndex === q.correctAnswer) {
          resultMsg.textContent = 'Richtig!';
        } else {
          resultMsg.textContent = 'Falsch. Richtige Antwort: ' +
            (q.correctAnswer !== undefined && q.answers ? q.answers[q.correctAnswer] : '');
        }
        // Buttons aktualisieren
        checkButton.disabled = true;
        nextButton.style.display = 'inline-block';
      });
      
      // Ereignis für nächste Frage
      nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
          showQuestion();
        } else {
          // Quiz abgeschlossen
          container.innerHTML = '<h3>Quiz abgeschlossen!</h3><p>Gut gemacht!</p>';
        }
      });
    }
  }
  
  // Starte das Quiz mit der ersten Frage
  showQuestion();
}