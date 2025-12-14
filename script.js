function createBoard() {
  let board = document.querySelector(".board");
  board.innerHTML = "";

  for (let i = 0; i < 9; i++) {
    let cell = document.createElement("button");
    cell.id = (i + 1).toString();

    cell.addEventListener("click", function () {
      handleMove(i, cell);
    });

    board.appendChild(cell);
  }
}
