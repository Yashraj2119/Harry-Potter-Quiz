const questions = [
  {
    question: "What is the name of Harry Potter’s owl?",
    options: ["Crookshanks", "Hedwig", "Errol", "Scabbers"],
    answer: "Hedwig"
  },
  {
    question: "Which house at Hogwarts does Harry belong to?",
    options: ["Slytherin", "Hufflepuff", "Gryffindor", "Ravenclaw"],
    answer: "Gryffindor"
  },
  {
    question: "What platform do students use to board the Hogwarts Express?",
    options: ["9", "10", "9 ¾", "8 ½"],
    answer: "9 ¾"
  },
  {
    question: "Who is the Half-Blood Prince?",
    options: ["Harry Potter", "Tom Riddle", "Severus Snape", "Broomstick"],
    answer: "Severus Snape"
  },
  {
    question: "What object must be caught to end a Quidditch match?",
    options: [" Quaffle", "Bludger", "Golden Snitch", "Draco Malfoy"],
    answer: "Golden Snitch"
  },
  {
    question: "What potion allows the drinker to assume the form of someone else?",
    options: ["Amortentia", "Veritaserum", "Felix Felicis", "Polyjuice Potion"],
    answer: "Polyjuice Potion"
  },
  {
    question: "What was the name of the goblin who helped Harry break into Gringotts?",
    options: ["Ragnok", "Bogrod", "Griphook", "Travers"],
    answer: "Griphook"
  },
  {
    question: "Which vault at Gringotts contained the Philosopher’s Stone?",
    options: ["Vault 394", "Vault 713", "Vault 221", "Vault 666"],
    answer: "Vault 713"
  }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 20;

const questionElement = document.getElementById("question");
const optionsElement = document.querySelector(".options");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");
const resultElement = document.getElementById("result");
const timerElement = document.getElementById("timer");
const houseElement = document.getElementById("house");

window.onload = () => {
  setTimeout(() => {
    document.getElementById("loading-screen").style.display = "none";
    showQuestion();
  }, 2500);
};

function showQuestion() {
  resetState();
  const q = questions[currentQuestion];
  questionElement.innerText = q.question;
  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.innerText = option;
    btn.onclick = () => selectAnswer(btn, q.answer);
    optionsElement.appendChild(btn);
  });
  timeLeft = 20;
  updateTimer();
}

function updateTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = Time Left: ${timeLeft}s;
    if (timeLeft === 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

function resetState() {
  nextBtn.style.display = "none";
  optionsElement.innerHTML = "";
  resultElement.textContent = "";
}

function selectAnswer(button, correctAnswer) {
  clearInterval(timer);
  const selected = button.innerText;
  if (selected === correctAnswer) {
    button.style.backgroundColor = "green";
    score++;
  } else {
    button.style.backgroundColor = "darkred";
  }
  Array.from(optionsElement.children).forEach(btn => {
    btn.disabled = true;
    if (btn.innerText === correctAnswer) {
      btn.style.border = "2px solid gold";
    }
  });
  nextBtn.style.display = "inline-block";
}

nextBtn.onclick = nextQuestion;

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  questionElement.innerText = "Quiz Complete!";
  optionsElement.innerHTML = "";
  resultElement.innerText = Your Score: ${score} / ${questions.length};
  houseElement.innerText = getHouse(score);
  restartBtn.style.display = "inline-block";
  nextBtn.style.display = "none";
}

function getHouse(score) {
  if (score === questions.length) return "Welcome to Gryffindor! 🦁";
  else if (score >= 3) return "You belong in Ravenclaw! 🦅";
  else if (score >= 1) return "You're a loyal Hufflepuff! 🦡";
  else return "A cunning Slytherin arises... 🐍";
}

restartBtn.onclick = () => {
  currentQuestion = 0;
  score = 0;
  restartBtn.style.display = "none";
  showQuestion();
};
