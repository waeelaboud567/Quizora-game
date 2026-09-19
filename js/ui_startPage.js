import { setPlayerName, setDifficultyLevel, setCategory } from "./game.js";

const loading = document.getElementsByClassName("loading");
const gameForm = document.getElementById("game-form");

function setname() {
  let name = document.getElementById("input-name").value;
  setPlayerName(name);
}
function setDL() {
  let dl = document.getElementById("dl-id").value;
  setDifficultyLevel(dl);
}
function setcategory() {
  let category = document.getElementById("category-id").value;
  setCategory(category);
}
function startGame() {
  let btn_startGame = document.getElementById("btn-startGame");
  btn_startGame.addEventListener("click", () => {
    setname();
    setDL();
    setcategory();
    location.href = "mainPage.html";
  });
}
startGame();

setTimeout(() => {
  loading[0].classList.add("hide");
  gameForm.classList.add("show");
}, 5000);
