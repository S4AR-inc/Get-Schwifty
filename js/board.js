export { Board };
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
		this.Board.forEach((row) => {
			let tr = document.createElement("tr");
			row.forEach((value) => {
				let cell = document.createElement("td");
				cell.classList.add("cell");
				if(value === null){
					cell.classList.add("empty");
				}else{
					cell.innerText = value;
				}
				tr.appendChild(cell);
			});
			table.appendChild(tr);
		});
		this.UIRoot.appendChild(table)
	}
}