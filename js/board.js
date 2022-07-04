import { DeepFreeze } from "./utils.js";

const DIRECTION = DeepFreeze({
	LEFT:	{x: -1	,y: 0	},
	RIGHT:	{x: 1	,y: 0	},
	UP:		{x: 0	,y: -1	},
	DOWN:	{x: 0	,y: 1	},
});
class Board{
	constructor(){
		this.PlayerData = {};
	}

	GenerateBoard(size = 3){
		let flatBoard = [...(new Array(size * size - 1)).keys()].map(value => value + 1);
		flatBoard.push(null);
		do {
			this._shuffleBoard(flatBoard);
		} while (!this._isValid(flatBoard, size));

		
		const emptyIndex = flatBoard.indexOf(null);
		this.Empty = {x: emptyIndex % size, y: Math.floor(emptyIndex / size)};
		this.Board = [];
		for (let i = 0; i < size; i++) {
			this.Board.push(flatBoard.splice(0, size));
		}
		this.PlayerData.size = size;
		this.PlayerData.moves = 0;
	}

	_shuffleBoard(flatBoard){
		for (let i = flatBoard.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			const temp = flatBoard[i];
			flatBoard[i] = flatBoard[j];
			flatBoard[j] = temp;
		}
	}

	_isValid(flatBoard, size){
		let flips = this._getFlips(flatBoard);
		let totalFlips = flips.reduce((partialSum, flip) => partialSum + flip, 0);
		if (size % 2 === 0){
			totalFlips += Math.floor(flatBoard.indexOf(null) / size) + 1;
		}
		return totalFlips % 2 === 0;
	}

	_getFlips(flatBoard){
		return flatBoard.map((current, currentIndex, arr) => 
			arr.filter((next, nextIndex) => current !== null && next !== null &&
											nextIndex > currentIndex && next < current).length
		);
	}

	GenerateBoardUI(uiRoot){
		this.UIRoot = uiRoot;
		let table = document.createElement("table");
		table.classList.add("board");
		this.Board.forEach((row, rowIndex) => {
			let tr = document.createElement("tr");
			row.forEach((value, columnIndex) => {
				let cell = document.createElement("td");
				cell.classList.add("cell");
				cell.setAttribute("row", rowIndex);
				cell.setAttribute("column", columnIndex);
				if(value === null){
					cell.classList.add("empty");
				}else{
					cell.innerText = value;
				}
				tr.appendChild(cell);
			});
			table.appendChild(tr);
		});
		this.UIRoot.classList.add("board-ui-root");
		this.UIRoot.appendChild(table);
		this.PlayerData.startTime = new Date(Date.now());
	}

	MoveCell(from){
		if (from.y < 0 || from.y >= this.Board.length ||
			from.x < 0 || from.x >= this.Board[from.y].length){
			return;
		}
		if ((Math.abs(from.x - this.Empty.x) !== 1 || from.y - this.Empty.y !== 0) &&
			(from.x - this.Empty.x !== 0 || Math.abs(from.y - this.Empty.y) !== 1)){
			return;
		}
		
		this.Board[this.Empty.y][this.Empty.x] = this.Board[from.y][from.x];
		this.Board[from.y][from.x] = null;
		this.Empty = from;

		this.PlayerData.moves++;

		let cell = this.UIRoot.querySelector(`.board .cell[row='${from.y}'][column='${from.x}']`);
		let empty = this.UIRoot.querySelector(".board .cell.empty");
		empty.innerText = cell.innerText;
		cell.innerText = "";
		empty.classList.remove("empty");
		cell.classList.add("empty");
	}

	MoveByDirection(direction){
		this.MoveCell({x: this.Empty.x - direction.x, y: this.Empty.y - direction.y});
	}

	CheckWin(){
		return this.Board.flat().every((value, index, arr) => {
			if (index === arr.length - 1){
				return value === null;
			}
			if (index !== arr.length - 2){
				return value + 1 === arr[index + 1];
			}
			return true;
		});
	}

	CleanUp(){
		this.UIRoot.removeChild(this.UIRoot.querySelector(".board"));
		this.UIRoot.classList.remove("board-ui-root");
		this.PlayerData.gameLength = new Date(Date.now()) - this.PlayerData.startTime;
		return this.PlayerData;
	}
}

const exports = { Board, DIRECTION };
export { Board, DIRECTION };

window.board = exports;