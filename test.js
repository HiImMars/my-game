const container = document.querySelector(".js-container");
const content = document.querySelector(".js-content");

let player = "X";
const wins = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];
let historyX = [];
let historyO = [];

function createMarkup() {
  let markup = "";
  for (let i = 1; i < 10; i++) {
    markup += `<div class="item js-item" data-id='${i}'></div>`;
  }

  content.innerHTML = markup;
}
createMarkup();
content.addEventListener("click", onClick);

function onClick(event) {
  const { target } = event;
  if (!target.classList.contains("js-item") || target.textContent) {
    return;
  }
  // const noWinner = historyO.length + historyX.length === 9; не працює зі змінною
  let result = "false";
  const id = Number(target.dataset.id);
  if (player === "X") {
    historyX.push(id);
    result = getWinner(historyX);
  } else {
    historyO.push(id);
    result = getWinner(historyO);
  }

  target.textContent = player;
  if (result) {
    setTimeout(function () {
      alert(`😎Winner ${player}🤩`);
    }, 300);
    setTimeout(function () {
      resetGame();
    }, 600);
    return;
  } else if (historyO.length + historyX.length === 9) {
    setTimeout(function () {
      alert(`There is no winner! Try again 🤷‍♂️`);
    }, 300);
    setTimeout(function () {
      resetGame();
    }, 600);
  }

  player = player === "X" ? "0" : "X";
}

function getWinner(arr) {
  return wins.some((item) => item.every((id) => arr.includes(id)));
}

function resetGame() {
  createMarkup();
  historyX = [];
  historyO = [];
  player = "X";
}
