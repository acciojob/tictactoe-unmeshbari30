let player1 = "";
let player2 = "";
let currentPlayer = "";
let currentSymbol = "x";
let gameActive = true;

let boardState = ["", "", "", "", "", "", "", "", ""];

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

document.getElementById("submit").addEventListener("click", function () {
  player1 = document.getElementById("player1").value;
  player2 = document.getElementById("player2").value;

  currentPlayer = player1;

  document.getElementById("game").style.display = "block";
  document.querySelector(".message").textContent =
    currentPlayer + ", you're up";

  createBoard();
});

function createBoard() {
  let board = document.querySelector(".board");
  board.innerHTML = "";

  for (let i = 0; i < 9; i++) {
    let cell = document.createElement("div");
    cell.id = (i + 1).toString();

    cell.addEventListener("click", function () {
      handleMove(i, cell);
    });

    board.appendChild(cell);
  }
}

function handleMove(index, cell) {
  if (!gameActive || boardState[index] !== "") {
    return;
  }

  boardState[index] = currentSymbol;
  cell.textContent = currentSymbol;

  if (checkWin()) {
    document.querySelector(".message").textContent =
      currentPlayer + " congratulations you won!";
    gameActive = false;
    return;
  }

  switchPlayer();
}

function switchPlayer() {
  if (currentSymbol === "x") {
    currentSymbol = "o";
    currentPlayer = player2;
  } else {
    currentSymbol = "x";
    currentPlayer = player1;
  }

  document.querySelector(".message").textContent =
    currentPlayer + ", you're up";
}

function checkWin() {
  return winPatterns.some(pattern =>
    pattern.every(i => boardState[i] === currentSymbol)
  );
}
