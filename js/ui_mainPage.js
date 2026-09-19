import {
  getPlayerName,
  getTimeValue,
  getDL,
  getCategoryNmae,
  restart,
  getDataFromApi,
  shuffle,
  getNumberQes,
  decreaseTime,
  saveResults,
  getBestResults,
  stopTimer,
} from "./game.js";

const correctSound = new Audio("../sounds/correct_answare.mp3");
const wrongSound = new Audio("../sounds/wrong_answare.wav");
const gameOverSound = new Audio("../sounds/game_over.wav");
const gameStartSound = new Audio("../sounds/start_game.mp3");
const gameCompleteSound = new Audio("../sounds/game_complete.wav");
const helpSound = new Audio("../sounds/help.wav");

let questionContiner = document.getElementById("question-id");
let btnsAnswares_con = document.getElementsByClassName("btn-result");
let progress = document.querySelector(".progress");
let btn_nextQuestion = document.querySelector("#btn-next");
let helpers = document.querySelector("#helpers");
let icons_lives;

let data = [];
let countQuestion;
let correctAnsware = 0;
let lives;

let usedFiftyFifty = false;
let usedSkip = false;
let usedMinusTen = false;

function showPlayerName() {
  let name = document.getElementById("name-id");

  name.textContent = "Name : " + getPlayerName();
}

function showTime() {
  let time = document.getElementById("time-id");

  time.textContent = "Time : " + getTimeValue();
}

function clickHome() {
  let btn_home = document.getElementById("btn-homeID");

  btn_home.addEventListener("click", () => {
    location.href = "index.html";
  });
}

function clickRestartButton() {
  let btn_restart = document.getElementById("btn-restartID");

  btn_restart.addEventListener("click", () => {
    rest();
  });
}

function increaseProgress() {
  let totalQuestions = getNumberQes();

  let currentQuestion = totalQuestions - (countQuestion + 1);

  let percentage = (currentQuestion / totalQuestions) * 100;

  progress.style.width = percentage + "%";
}

function fillLife() {
  let livesContainer = document.getElementsByClassName("lives")[0];

  livesContainer.innerHTML = `
    <i class="fa-solid fa-heart heart"></i>
    <i class="fa-solid fa-heart heart"></i>
    <i class="fa-solid fa-heart heart"></i>
  `;

  icons_lives = document.querySelectorAll(".heart");
}

function decreaseLife() {
  for (let element of icons_lives) {
    if (!element.classList.contains("lost")) {
      element.classList.add("lost");

      lives--;

      break;
    }
  }

  if (lives === 0) {
    console.log("Game Over");
  }
}

function checkAnsware() {
  let btns_con = document.querySelector(".btns-con");

  btns_con.addEventListener("click", (event) => {
    if (event.target.tagName !== "BUTTON") {
      return;
    }

    if (event.target.value === "1") {
      correctAnsware++;
      correctSound.play();
    } else {
      decreaseLife();
      wrongSound.play();
    }

    let btns_result = document.querySelectorAll(".btn-result");

    btns_result.forEach((element) => {
      if (element.value === "1") {
        element.classList.add("correct-answare");
      } else {
        element.classList.add("wrong-answare");
      }

      element.disabled = true;
    });

    if (lives === 0) {
      GameComplete("Game Over");
      gameOverSound.play();
    }
  });
}
function GameComplete(caption) {
  stopTimer();
  let bestResults = [];
  let body = document.querySelector("body");
  const result = {
    name: getPlayerName(),
    difficulty: getDL(),
    category: getCategoryNmae(),
    questions: getNumberQes(),
    correctAnswers: correctAnsware,
    time: getTimeValue(),
  };
  saveResults(result);
  bestResults = getBestResults();
  body.innerHTML += `<div class="result-con">
         <h2>${caption}</h2>
         <div class="statistics">
            <div>
                ${result.name}
            </div>
            <div>
                ${correctAnsware}/${getNumberQes()}
            </div>
            <div>
                Time: ${result.time}
            </div>
            <div>
                 ${result.category}
            </div>
            <div>
                ${result.difficulty}
            </div>
         </div>
         <table>
            <caption>BEST RESULTS</caption>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Question </th>
                    <th>Time </th>
                    <th>Difficulty</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>${bestResults[0]?.name ?? "_"}</td>
                    <td>${bestResults[0]?.correctAnswers ?? " _ "}${"/"}${bestResults[0]?.questions ?? " _ "}</td>
                    <td>${bestResults[0]?.time ?? "_"}</td>
                    <td>${bestResults[0]?.difficulty ?? "_"}</td>
                </tr>
                <tr>
                    <td>${bestResults[1]?.name ?? "_"}</td>
                    <td>${bestResults[1]?.correctAnswers ?? " _ "}${"/"}${bestResults[1]?.questions ?? " _ "}</td>
                    <td>${bestResults[1]?.time ?? "_"}</td>
                    <td>${bestResults[1]?.difficulty ?? "_"}</td>
                </tr>
                <tr>
                    <td>${bestResults[2]?.name ?? "_"}</td>
                    <td>${bestResults[2]?.correctAnswers ?? " _ "}${"/"}${bestResults[2]?.questions ?? " _ "}</td>
                    <td>${bestResults[2]?.time ?? "_"}</td>
                    <td>${bestResults[2]?.difficulty ?? "_"}</td>
                </tr>
                <tr>
                    <td>${bestResults[3]?.name ?? "_"}</td>
                    <td>${bestResults[3]?.correctAnswers ?? " _ "}${"/"}${bestResults[3]?.questions ?? " _ "}</td>
                    <td>${bestResults[3]?.time ?? "_"}</td>
                    <td>${bestResults[3]?.difficulty ?? "_"}</td>
                </tr>
                <tr>
                    <td>${bestResults[4]?.name ?? "_"}</td>
                    <td>${bestResults[4]?.correctAnswers ?? " _ "}${"/"}${bestResults[4]?.questions ?? " _ "}</td>
                    <td>${bestResults[4]?.time ?? "_"}</td>
                    <td>${bestResults[4]?.difficulty ?? "_"}</td>
                </tr>
            </tbody>
         </table>
         <div class="btns-results">
            <button id="playAgain-id">play Again</button>
         </div>
    </div>`;
  buttonResultPanel();
}
function buttonResultPanel() {
  let btn_play = document.getElementById("playAgain-id");
  btn_play.addEventListener("click", () => {
    location.reload();
  });
}
function checkEndGame() {
  if (countQuestion === -1) {
    return false;
  }

  return true;
}

function nextQuestion() {
  btn_nextQuestion.addEventListener("click", () => {
    resetAnswerButtons();

    showQuestion();

    increaseProgress();
  });
}

function showQuestion() {
  if (!checkEndGame()) {
    console.log("Game End");
    gameCompleteSound.play();
    GameComplete("Game Complete");
    return;
  }

  let answares = shuffle([
    data[countQuestion].correct_answer,

    data[countQuestion].incorrect_answers[0],

    data[countQuestion].incorrect_answers[1],

    data[countQuestion].incorrect_answers[2],
  ]);

  questionContiner.textContent = data[countQuestion].question;

  for (let i = 0; i < 4; i++) {
    btnsAnswares_con[i].textContent = answares[i];

    if (answares[i] === data[countQuestion].correct_answer) {
      btnsAnswares_con[i].value = "1";
    } else {
      btnsAnswares_con[i].value = "0";
    }
  }

  countQuestion--;
}

function helpMethod() {
  helpers.addEventListener("change", () => {
    let selectedValue = helpers.value;

    if (selectedValue === "50/50") {
      fiftyFifty();
    } else if (selectedValue === "skip") {
      skipQuestion();
    } else if (selectedValue === "-10s") {
      minusTenSeconds();
    }
    helpSound.play();
    helpers.value = "";
  });
}

function fiftyFifty() {
  if (usedFiftyFifty) {
    return;
  }

  let wrongAnswers = document.querySelectorAll('.btn-result[value="0"]');

  for (let i = 0; i < 2; i++) {
    wrongAnswers[i].disabled = true;

    wrongAnswers[i].classList.add("fifty-fifty");
  }
  usedFiftyFifty = true;
}

function skipQuestion() {
  if (usedSkip) {
    return;
  }

  usedSkip = true;
  resetAnswerButtons();
  showQuestion();
  increaseProgress();
}

function minusTenSeconds() {
  if (usedMinusTen) {
    return;
  }

  decreaseTime(10);

  usedMinusTen = true;
}

function resetAnswerButtons() {
  for (let i = 0; i < btnsAnswares_con.length; i++) {
    btnsAnswares_con[i].classList.remove(
      "correct-answare",
      "wrong-answare",
      "fifty-fifty",
    );

    btnsAnswares_con[i].disabled = false;
  }
}

async function rest() {
  showPlayerName();
  data = await getDataFromApi();

  if (!data || data.length === 0) {
    console.log("Could not load questions from API");
    return;
  }

  restart();
  countQuestion = getNumberQes() - 1;
  correctAnsware = 0;
  lives = 3;
  usedFiftyFifty = false;
  usedSkip = false;
  usedMinusTen = false;
  fillLife();
  progress.style.width = "0%";
  resetAnswerButtons();
  helpers.value = "";
  showQuestion();
  gameStartSound.play();
}

rest();
clickHome();
clickRestartButton();
helpMethod();
checkAnsware();
nextQuestion();
gameStartSound.play();
setInterval(() => {
  showTime();
}, 1000);
