const readlineSync = require("readline-sync");

const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const columns = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
const ships = [
  { size: 2, count: 1 },
  { size: 3, count: 2 },
  { size: 4, count: 1 },
  { size: 5, count: 1 },
];
let gameBoard = [];

function buildGrid(gridSize) {
  gameBoard = new Array(gridSize)
    .fill(null)
    .map(() => new Array(gridSize).fill(" "));
}

function placeShips() {
  for (const ship of ships) {
    for (let i = 0; i < ship.count; i++) {
      let placed = false;
      while (!placed) {
        const orientation = Math.floor(Math.random() * 2);
        const row = Math.floor(Math.random() * gameBoard.length);
        const col = Math.floor(Math.random() * gameBoard[row].length);

        if (orientation === 0) {
          if (col + ship.size <= gameBoard[row].length) {
            let valid = true;
            for (let j = 0; j < ship.size; j++) {
              if (gameBoard[row][col + j] !== " ") {
                valid = false;
                break;
              }
            }
            if (valid) {
              for (let j = 0; j < ship.size; j++) {
                gameBoard[row][col + j] = "X";
              }
              placed = true;
            }
          }
        } else {
          if (row + ship.size <= gameBoard.length) {
            let valid = true;
            for (let j = 0; j < ship.size; j++) {
              if (gameBoard[row + j][col] !== " ") {
                valid = false;
                break;
              }
            }
            if (valid) {
              for (let j = 0; j < ship.size; j++) {
                gameBoard[row + j][col] = "X";
              }
              placed = true;
            }
          }
        }
      }
    }
  }
}

function startNewGame() {
  console.log("Press any key to start the game.");
  readlineSync.keyInPause("");
  buildGrid(10);
  placeShips();

  console.log("Game started!");
}

function updateGameBoard(row, col, hit) {
  if (hit == true) {
    gameBoard[row][col] = "H";
    console.log("Hit! You have struck a ship.");
  } else {
    gameBoard[row][col] = "M";
    console.log("Miss! You have missed.");
  }
}

function allShipsDestroyed() {
  for (const row of gameBoard) {
    for (const cell of row) {
      if (cell === "X") {
        return false;
      }
    }
  }
  return true;
}

function playGame() {
  console.log("Enter a location to strike (e.g. A2):");
  while (!allShipsDestroyed()) {
    const userInput = readlineSync.question("").toUpperCase();
    const row = rows.indexOf(userInput[0]);
    const col = columns.indexOf(userInput.slice(1));

    if (row === -1 || col === -1) {
      console.log("Invalid entry. Please enter a valid location (e.g. A2):");
    } else if (gameBoard[row][col] === "H" || gameBoard[row][col] === "M") {
      console.log("You have already picked this location. Try again!");
    } else if (gameBoard[row][col] === "X") {
      updateGameBoard(row, col, true);
    } else {
      updateGameBoard(row, col, false);
    }
  }
  console.log("You have destroyed all battleships!");
}

startNewGame();

let restart;
do {
  playGame();
  restart = readlineSync.question("Would you like to play again? (Y/N): ");
  if (restart.toLowerCase() === "y") {
    startNewGame();
  }
} while (restart.toLowerCase() === "y");

console.log("Thank you for playing Battleship! Goodbye!");
