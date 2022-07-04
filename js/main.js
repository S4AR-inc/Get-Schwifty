import { Board, DIRECTION } from "./board.js";
import { DeepFreeze, IMECompositionFilter } from "./utils.js";
import { GameOptions } from "./gameOptions.js";
import { ScoreBoard as ScoreBoardController } from "./controllers/scoreBoard.js";
import { ScoreBoard as ScoreBoardModel } from "./models/scoreBoard.js";

let GameOptionsMenu;
let GameBoard;
let GameScoreBoardController;
let GameScoreBoardModel;

const KEYS_DIRECTION_MAP = DeepFreeze([
	{keys: [ "ArrowLeft",	"KeyA" ], direction: DIRECTION.LEFT	},
	{keys: [ "ArrowRight",	"KeyD" ], direction: DIRECTION.RIGHT},
	{keys: [ "ArrowUp",		"KeyW" ], direction: DIRECTION.UP	},
	{keys: [ "ArrowDown",	"KeyS" ], direction: DIRECTION.DOWN	},
]);

Load();

function Load() {
	GameOptionsMenu = new GameOptions();
	GameOptionsMenu.addEventListener("start-game", StartGame);
	GameOptionsMenu.Show(document.querySelector("body>main"));
}

function StartGame(eventData){
	GameBoard = new Board();
	GameBoard.GenerateBoard(eventData.detail.size);
	GameBoard.GenerateBoardUI(document.querySelector("body>main"));
	document.addEventListener("keydown", KeyDown);
}

function KeyDown(keyboardEvent){
	IMECompositionFilter((keyboardEvent) => {
		let direction = KEYS_DIRECTION_MAP.find(mapping => mapping.keys.includes(keyboardEvent.code))?.direction;
		if (direction === undefined){
			return;
		}
		GameBoard.MoveByDirection(direction);
		if (GameBoard.CheckWin()){
			WinGame();
		}
	},keyboardEvent);
}

function WinGame() {
	GameScoreBoardModel = new ScoreBoardModel(window.localStorage);
	GameScoreBoardController = new ScoreBoardController(GameScoreBoardModel, 5, score => score.moves, -1);
	let playerData = GameBoard.CleanUp();
	alert("You win!");
	let name = prompt("What is your name?");
	if (name === null || name == ""){
		return;
	}
	playerData.name = name;
	GameScoreBoardController.Add(playerData);
}

const exports = { GameBoard, Load };
export { GameBoard, Load };

window.main = exports;