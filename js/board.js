import { deepFreeze } from "./utils.js"

const DIRECTION = deepFreeze({
	LEFT:	{x: -1	,y: 0	},
	RIGHT:	{x: 1	,y: 0	},
	UP:		{x: 0	,y: -1	},
	DOWN:	{x: 0	,y: 1	},
});
class Board{
	constructor(){
		this.Board = [
			[6, null, 7],
			[3, 2, 8],
			[4, 5, 1]
		];
		this.Empty = {x: 1, y: 0};
	}

	generateBoard(uiRoot){
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
		this.UIRoot.appendChild(table);
	}

	MoveCell(from){
		if (from.y < 0 || from.y >= this.Board.length ||
			from.x < 0 || from.x >= this.Board[from.y].length){
			console.warn("The selected cell to move from is out of range");
			return;
		}
		if ((Math.abs(from.x - this.Empty.x) !== 1 || from.y - this.Empty.y !== 0) &&
			(from.x - this.Empty.x !== 0 || Math.abs(from.y - this.Empty.y) !== 1)){
			console.warn("The selected cell to move from is not adjacent to the empty cell");
			return;
		}
		
		this.Board[this.Empty.y][this.Empty.x] = this.Board[from.y][from.x];
		this.Board[from.y][from.x] = null;
		this.Empty = from;

		let cell = this.UIRoot.querySelector(`.board .cell[row='${from.y}'][column='${from.x}']`);
		let empty = this.UIRoot.querySelector(`.board .cell.empty`);
		empty.innerText = cell.innerText;
		cell.innerText = "";
		empty.classList.remove("empty");
		cell.classList.add("empty");
	}

	MoveByDirection(direction){
		this.MoveCell({x: this.Empty.x - direction.x, y: this.Empty.y - direction.y})
	}
}

const exports = { Board, DIRECTION };
export { Board, DIRECTION };

window.board = exports;