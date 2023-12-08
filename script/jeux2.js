const questions = [
  { question: 'Le changement climatique est principalement causé par des phénomènes naturels', solution: false },
  { question: 'La réduction de la consommation de viande n\'a aucun impact sur les émissions de gaz à effet de serre', solution: false },
  { question: 'La déforestation contribue au changement climatique en libérant du dioxyde de carbone dans l\'atmosphère', solution: true },
  { question: 'Les océans jouent un rôle important dans la régulation du climat en absorbant le dioxyde de carbone', solution: true },
  { question: 'L\'acidification des océans, causée par l\'absorption de dioxyde de carbone, peut avoir des effets néfastes sur les récifs coralliens', solution: true },
  { question: 'La notion de "sensibilité climatique" telle que définie par le GIEC représente la capacité de la Terre à maintenir son climat stable face aux perturbations humaines et naturelles', solution: false },
];

let currentQuestionIndex = 0;
let answered = false; // Ajout de la variable answered

function generateQuestion() {
  const gameContainer = document.getElementById("GameContainer");
  const questionData = questions[currentQuestionIndex];

  if (questionData) {
    const questionElement = document.createElement("p");
    questionElement.textContent = questionData.question;
    gameContainer.innerHTML = "";
    gameContainer.appendChild(questionElement);

    const trueButton = createButton("Vrai", () => checkAnswer(true), "true");
    const falseButton = createButton("Faux", () => checkAnswer(false), "false");

    gameContainer.appendChild(trueButton);
    gameContainer.appendChild(falseButton);

    const nextButton = createButton("Question suivante", () => nextQuestion(), "next");
    nextButton.disabled = true;
    gameContainer.appendChild(nextButton);
  } else {
    const finishButton = createButton("Récompense", () => changerDePage(), "change");
    gameContainer.innerHTML = "<p>Bravo, vous avez terminé le quiz !</p>";
    gameContainer.appendChild(finishButton);
  }
}

function changerDePage() {
  window.location.href = './finish.html';
}

function createButton(text, clickHandler, className) {
  const button = document.createElement("button");
  button.textContent = text;
  button.addEventListener("click", clickHandler);
  button.classList.add(className);

  return button;
}

function checkAnswer(userAnswer) {
  const questionData = questions[currentQuestionIndex];
  const feedbackElement = document.createElement("p");

  if (!answered) {
    answered = true;
    const gameContainer = document.getElementById("GameContainer");

    if (userAnswer === questionData.solution) {
      feedbackElement.textContent = "Bien joué, c'est la bonne réponse !";

      const nextButton = document.querySelector('.next');
      nextButton.disabled = false;
    } else {
      feedbackElement.textContent = "Désolé, ce n'est pas correct. La réponse était " + (questionData.solution ? "Vrai" : "Faux");

      const retryButton = createButton("Réessayer", () => retryQuestion(), "retry");
      gameContainer.appendChild(retryButton);
    }

    gameContainer.appendChild(feedbackElement);
  }
}

function retryQuestion() {
  answered = false;
  generateQuestion();
}

function nextQuestion() {
  currentQuestionIndex++;
  answered = false;
  generateQuestion();
}

// Appeler la fonction pour générer la première question
generateQuestion();
