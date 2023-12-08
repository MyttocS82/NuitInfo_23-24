const questions = [
  { question: 'Réduire la consommation d\'énergie', solution: true },
  { question: 'Utiliser des énergies renouvelables', solution: true },
  { question: 'Augmenter l\'utilisation des combustibles fossiles', solution: false },
  { question: 'Planter des arbres pour compenser les émissions', solution: true },
  { question: 'Ignorer complètement les problèmes climatiques', solution: false },
  { question: 'Utiliser les transports individuels', solution: false },
];

let currentQuestionIndex = 0;
let answered = false;

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
    gameContainer.appendChild(nextButton);
    nextButton.style.display = 'none'; // Cacher le bouton "Question suivante" initialement
  } else {
    gameContainer.innerHTML = "<p>Bravo, vous avez terminé le quiz !</p>";
  }
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
      nextButton.style.display = 'block'; // Afficher le bouton "Question suivante" si la réponse est correcte
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
  const gameContainer = document.getElementById("GameContainer");
  const retryButton = document.querySelector('.retry');
  const nextButton = document.querySelector('.next');

  // Supprimer les boutons existants
  gameContainer.removeChild(retryButton);
  gameContainer.removeChild(nextButton);

  generateQuestion();
}

function nextQuestion() {
  currentQuestionIndex++;
  answered = false;
  generateQuestion();
}

// Appeler la fonction pour générer la première question
generateQuestion();