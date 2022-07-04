import { Board } from "./board.js"

let GameBoard;

Load();

function Load() {
	GameBoard = new Board();
	GameBoard.generateBoard(document.querySelector("body>main"))
}

const exports = { GameBoard, Load };
export { GameBoard, Load };

window.main = exports;