const readlineSync = require("readline-sync");

const rows = ["A", "B", "C"];
const columns = ["1", "2", "3"];
const shipsCount = 2;
const gameBoard = [
  [" ", " ", " "],
  [" ", " ", " "],
  [" ", " ", " "],
];
let hits = 0;

function startNewGame() {
  console.log("Press any key to start the game.");
  readlineSync.keyInPause("");
  for (let i = 0; i < gameBoard.length; i++) {
    for (let j = 0; j < gameBoard[i].length; j++) {
      gameBoard[i][j] = " ";
    }
  }

  let ship1Row, ship1Col, ship2Row, ship2Col;
  do {
    ship1Row = Math.floor(Math.random() * 3);
    ship1Col = Math.floor(Math.random() * 3);
    ship2Row = Math.floor(Math.random() * 3);
    ship2Col = Math.floor(Math.random() * 3);
  } while (
    (ship1Row === ship2Row && ship1Col === ship2Col) ||
    gameBoard[ship1Row][ship1Col] === "X" ||
    gameBoard[ship2Row][ship2Col] === "X"
  );

  gameBoard[ship1Row][ship1Col] = "X";
  gameBoard[ship2Row][ship2Col] = "X";

  hits = 0;

  console.log("Game started!");
}

function updateGameBoard(row, col, hit) {
  if (hit == true) {
    gameBoard[row][col] = "X";
    hits++;
    console.log(
      "Hit. You have sunk a battleship. " +
        (shipsCount - hits) +
        " ship(s) remaining."
    );
  } else {
    gameBoard[row][col] = "0";
    console.log("You have missed!");
  }
}

function playGame() {
  console.log("Enter a location to strike (e.g. A2):");
  while (hits < shipsCount) {
    const userInput = readlineSync.question("");
    const row = rows.indexOf(userInput[0].toUpperCase());
    const col = columns.indexOf(userInput[1]);
    if (row === -1 || col === -1) {
      console.log("Invalid entry. Please enter a valid location (e.g. A2):");
    } else if (gameBoard[row][col] === "X" || gameBoard[row][col] === "0") {
      console.log("You have already picked this location. Miss!");
    } else if (gameBoard[row][col] === "") {
      updateGameBoard(row, col, true);
    } else {
      updateGameBoard(row, col, false);
    }
    if (hits === shipsCount) {
      console.log("You have destroyed all battleships!");
    }
  }
}

startNewGame();

let restart;
do {
  playGame();
  restart = readlineSync.question("Would you like to play again? (Y/N): ");
  if (restart.toLowerCase() === "y") {
    startNewGame();
    hits = 0;
  }
} while (restart.toLowerCase() === "y");

console.log("Thank you for playing Battleship! Goodbye!");
