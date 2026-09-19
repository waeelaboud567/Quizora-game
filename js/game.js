import {
  setPlayerNameLocalStorage,
  setDifficultyLevelLocalStorage,
  setCategoryLocalStorage,
  getPlayerNameLocalStorage,
  getDifficultyLevelLocalStorage,
  getCategoryLocalStorage,
  saveResultsInLocalStorage,
  getResultsInLocalStorage,
} from "./storage.js";
let time = 0;
let numclearInterval;
let data = [];
let Categorys = [];
export function setPlayerName(name) {
  setPlayerNameLocalStorage(valNmae(name));
}
export function setDifficultyLevel(dl) {
  setDifficultyLevelLocalStorage(dl);
}
export function setCategory(Category) {
  setCategoryLocalStorage(Category);
}
export function getPlayerName() {
  return getPlayerNameLocalStorage();
}
export function getDL() {
  return getDifficultyLevelLocalStorage();
}
export function getCategoryNmae() {
  return getCategoryLocalStorage();
}
export function getNumberQes() {
  let dl = getDifficultyLevelLocalStorage();
  if (dl === "easy") return 8;
  else if (dl === "medium") return 10;
  else return 15;
}
export function decreaseTime(seconds) {
  time -= seconds;

  if (time < 0) {
    time = 0;
  }
}
export function stopTimer() {
  clearInterval(numclearInterval);
}
async function getCategoriesFromApi() {
  const response = await fetch("https://opentdb.com/api_category.php");

  const data = await response.json();

  Categorys = data.trivia_categories;
}
export async function getDataFromApi() {
  await getCategoriesFromApi();
  const url = `https://opentdb.com/api.php?amount=${getNumberQes()}&category=${getCategory()}&difficulty=${getDifficultyLevelLocalStorage()}&type=multiple`;
  let response = await fetch(url, {
    method: "GET",
  });
  data = (await response.json()).results;
  console.log(data);
  return data;
}
export function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}
export function getTimeValue() {
  let minutes = Math.floor(time / 60);

  let seconds = time % 60;

  return (
    String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0")
  );
}
export function restart() {
  clearInterval(numclearInterval);
  onTimer();
}
export function saveResults(result) {
  result.time = time;

  let bestResults = getResultsInLocalStorage() || [];

  bestResults.push(result);

  const difficulty = {
    hard: 3,
    medium: 2,
    easy: 1,
  };

  bestResults.sort((a, b) => {
    if (a.correctAnswers !== b.correctAnswers) {
      return b.correctAnswers - a.correctAnswers;
    }

    if (difficulty[a.difficulty] !== difficulty[b.difficulty]) {
      return difficulty[b.difficulty] - difficulty[a.difficulty];
    }

    return a.time - b.time;
  });

  if (bestResults.length > 5) {
    bestResults.pop();
  }

  saveResultsInLocalStorage(bestResults);
}
export function getBestResults() {
  return getResultsInLocalStorage();
}
function getCategory() {
  let id;
  Categorys.forEach((element) => {
    if (element.name === getCategoryLocalStorage()) id = element.id;
  });
  return id;
}
function onTimer() {
  time = 0;

  numclearInterval = setInterval(() => {
    time++;
  }, 1000);
}
function valNmae(name) {
  name = name.trim();
  if (name.length < 1) name = "Player1";
  return name;
}
