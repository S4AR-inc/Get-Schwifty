import { Board } from "./board.js"

let GameBoard;

Load();

function Load() {
	GameBoard = new Board();
	GameBoard.generateBoard(document.body)
}