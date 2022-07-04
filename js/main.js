import { Board, DIRECTION } from "./board.js";
import { deepFreeze, IMECompositionFilter } from "./utils.js";

let GameBoard;

const KEYS_DIRECTION_MAP = deepFreeze([
	{keys: [ "ArrowLeft",	"KeyA" ], direction: DIRECTION.LEFT	},
	{keys: [ "ArrowRight",	"KeyD" ], direction: DIRECTION.RIGHT},
	{keys: [ "ArrowUp",		"KeyW" ], direction: DIRECTION.UP	},
	{keys: [ "ArrowDown",	"KeyS" ], direction: DIRECTION.DOWN	},
]);

Load();

function Load() {
	GameBoard = new Board();
	GameBoard.generateBoard(document.querySelector("body>main"));
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