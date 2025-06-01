let allQuestions = [];
let selectedQuestions = [];
let currentIndex = 0;
let score = 0;

async function startQuiz() {
  const res = await fetch('quiz_gesamt.json');
  allQuestions = await res.json();
  selectedQuestions = getRandomQuestionsByTopic(allQuestions);
  shuffleArray(selectedQuestions);
  currentIndex = 0;
  score = 0;
  document.getElementById('result-box').classList.add('hidden');
  document.getElementById('quiz-container').classList.remove('hidden');
  showQuestion();
}

function getRandomQuestionsByTopic(data) {
  const topics = [...new Set(data.map(q => q.thema))];
  let selected = [];
  for (let topic of topics) {
    const topicQs = data.filter(q => q.thema === topic);
    const n = Math.floor(Math.random() * 6) + 10; // 10–15 questions
    selected.push(...shuffleArray([...topicQs]).slice(0, n));
  }
  return selected;
}

function showQuestion() {
  const q = selectedQuestions[currentIndex];
  document.getElementById('feedback').innerHTML = '';
  document.getElementById('next-button').classList.add('hidden');

  document.getElementById('question-box').innerHTML =
    `<div class="topic">Thema: ${q.thema}</div><h3>Frage ${currentIndex + 1}:</h3><p>${q.frage}</p>`;

  const shuffledAnswers = q.antworten.map((a, i) => ({ a, i }));
  shuffleArray(shuffledAnswers);

  const answersHTML = shuffledAnswers.map(obj => `
    <label><input type="radio" name="answer" value="${obj.i}"> ${obj.a}</label><br>
  `).join("");

  document.getElementById('answers-box').innerHTML = answersHTML;

  document.querySelectorAll('input[name="answer"]').forEach(input => {
    input.onclick = () => {
      const selected = parseInt(input.value);
      const correct = q.korrekt;
      const feedback = selected === correct ? "✅ Richtig!" : "❌ Falsch!";
      document.getElementById('feedback').innerHTML =
        `${feedback}<br><i>${q.erklaerung}</i>`;
      if (selected === correct) score++;
      document.getElementById('next-button').classList.remove('hidden');
      document.querySelectorAll('input[name="answer"]').forEach(i => i.disabled = true);
    };
  });
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex < selectedQuestions.length) {
    showQuestion();
  } else {
    document.getElementById('quiz-container').classList.add('hidden');
    document.getElementById('result-box').classList.remove('hidden');
    document.getElementById('result-box').innerHTML =
      `<h2>Ergebnis</h2><p>Du hast ${score} von ${selectedQuestions.length} Fragen richtig beantwortet.</p>`;
  }
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}
