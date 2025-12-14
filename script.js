//your JS code here. If required.
let player1 = "";
let player2 = "";
let currentPlayer = "";
let currentSymbol = "X";
let gameActive = true;

let boardState = ["", "", "", "", "", "", "", "", ""];

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

document.getElementById("submit").addEventListener("click", function () {
  player1 = document.getElementById("player-1").value;
  player2 = document.getElementById("player-2").value;

  if (player1 === "" || player2 === "") {
    alert("Enter both player names");
    return;
  }

  currentPlayer = player1;
  document.getElementById("game").style.display = "block";
  document.querySelector(".message").textContent = currentPlayer + ", you're up";

  createBoard();
});

function createBoard() {
  let board = document.querySelector(".board");

  for (let i = 0; i < 9; i++) {
    let cell = document.createElement("button");
    cell.className = "cell";
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
  if (currentSymbol === "X") {
    currentSymbol = "O";
    currentPlayer = player2;
  } else {
    currentSymbol = "X";
    currentPlayer = player1;
  }

  document.querySelector(".message").textContent =
    currentPlayer + ", you're up";
}

function checkWin() {
  return winPatterns.some(pattern => {
    return pattern.every(index => boardState[index] === currentSymbol);
  });
}
