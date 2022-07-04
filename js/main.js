import { Board, DIRECTION } from "./board.js";
import { DeepFreeze, IMECompositionFilter } from "./utils.js";
import { GameOptions } from "./gameOptions.js";

let GameOptionsMenu;
let GameBoard;

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
	document.addEventListener("keydown", (keyboardEvent) => {
		IMECompositionFilter((keyboardEvent) => {
			let direction = KEYS_DIRECTION_MAP.find(mapping => mapping.keys.includes(keyboardEvent.code))?.direction;
			if (direction === undefined){
				return;
			}
			GameBoard.MoveByDirection(direction);
			if (GameBoard.CheckWin()){
				alert("You win!");
			}
		},keyboardEvent);
	});
}

const exports = { GameBoard, Load };
export { GameBoard, Load };

window.main = exports;