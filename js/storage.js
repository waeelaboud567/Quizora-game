export function setPlayerNameLocalStorage(name) {
    localStorage.setItem("name",name);    
}
export function setDifficultyLevelLocalStorage(dl) {
    localStorage.setItem("Difficulty Level",dl);
}
export function setCategoryLocalStorage(Category) {
    localStorage.setItem("Category",Category);
}
export function getPlayerNameLocalStorage() {
   return localStorage.getItem("name");
}
export function getDifficultyLevelLocalStorage() {
   return localStorage.getItem("Difficulty Level");
}
export function getCategoryLocalStorage() {
    return localStorage.getItem("Category"); 
}
export function saveResultsInLocalStorage(bestResults){
  localStorage.setItem("best_results",JSON.stringify(bestResults));
}
export function getResultsInLocalStorage(){
  return JSON.parse(localStorage.getItem("best_results"));
}