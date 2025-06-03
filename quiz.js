function runQuiz(questions, container) {
    container.innerHTML = '';
    let index = 0;
    let score = 0;

    function showQuestion() {
        if (index >= questions.length) {
            container.innerHTML = `<p>Quiz beendet! Du hast ${score} von ${questions.length} richtig beantwortet.</p>`;
            return;
        }

        const q = questions[index];
        container.innerHTML = '';

        const questionEl = document.createElement('p');
        questionEl.textContent = q.question;
        container.appendChild(questionEl);

        const optionsContainer = document.createElement('div');
        q.options.forEach((opt, i) => {
            const label = document.createElement('label');
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'quiz';
            radio.value = i;
            label.appendChild(radio);
            label.appendChild(document.createTextNode(opt));
            optionsContainer.appendChild(label);
            optionsContainer.appendChild(document.createElement('br'));
        });
        container.appendChild(optionsContainer);

        const submitBtn = document.createElement('button');
        submitBtn.textContent = 'Antwort prüfen';
        container.appendChild(submitBtn);

        const feedbackEl = document.createElement('p');
        container.appendChild(feedbackEl);

        const nextBtn = document.createElement('button');
        nextBtn.textContent = 'Nächste Frage';
        nextBtn.style.display = 'none';
        container.appendChild(nextBtn);

        submitBtn.addEventListener('click', () => {
            const selected = container.querySelector('input[name="quiz"]:checked');
            if (!selected) {
                alert('Bitte wähle eine Antwort.');
                return;
            }
            const answer = parseInt(selected.value);
            if (answer === q.answer) {
                feedbackEl.textContent = 'Richtig!';
                score++;
            } else {
                feedbackEl.textContent = 'Falsch. Richtige Antwort: ' + q.options[q.answer];
            }
            // Optionen sperren
            container.querySelectorAll('input[name="quiz"]').forEach(inp => inp.disabled = true);
            submitBtn.disabled = true;
            nextBtn.style.display = 'inline-block';
        });

        nextBtn.addEventListener('click', () => {
            index++;
            showQuestion();
        });
    }

    showQuestion();
}

function runExam(questions, container) {
    container.innerHTML = '';
    let index = 0;
    let score = 0;
    const userAnswers = [];

    function showQuestion() {
        if (index >= questions.length) {
            // Ergebnis anzeigen
            score = 0;
            for (let i = 0; i < questions.length; i++) {
                const correct = questions[i].answers.slice().sort((a, b) => a - b);
                const user = (userAnswers[i] || []).slice().sort((a, b) => a - b);
                if (JSON.stringify(correct) === JSON.stringify(user)) {
                    score++;
                }
            }
            container.innerHTML = `<p>Prüfung beendet! Du hast ${score} von ${questions.length} richtig beantwortet.</p>`;
            return;
        }

        const q = questions[index];
        container.innerHTML = '';

        const questionEl = document.createElement('p');
        questionEl.textContent = q.question;
        container.appendChild(questionEl);

        const optionsContainer = document.createElement('div');
        q.options.forEach((opt, i) => {
            const label = document.createElement('label');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = 'exam';
            checkbox.value = i;
            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(opt));
            optionsContainer.appendChild(label);
            optionsContainer.appendChild(document.createElement('br'));
        });
        container.appendChild(optionsContainer);

        const nextBtn = document.createElement('button');
        nextBtn.textContent = (index < questions.length - 1) ? 'Nächste Frage' : 'Beenden';
        container.appendChild(nextBtn);

        nextBtn.addEventListener('click', () => {
            const selected = container.querySelectorAll('input[name="exam"]:checked');
            const answer = Array.from(selected).map(i => parseInt(i.value));
            userAnswers.push(answer);
            index++;
            showQuestion();
        });
    }

    showQuestion();
}