class GameOptions extends EventTarget{
	constructor(){
		super();
	}
	
	Show(uiRoot){
		this.UIRoot = uiRoot;
		const template = document.querySelector("#game-options-start-game").content.cloneNode(true);
		template.querySelector("#start-game").addEventListener("click", this.StartGame.bind(this));
		this.UIRoot.classList.add("game-options");
		this.UIRoot.appendChild(template);
	}
	
	StartGame(){
		const size = this.UIRoot.querySelector("#board-size").valueAsNumber;
		const StartGameEvent = new CustomEvent("start-game", { detail: { size } });
		this.UIRoot.removeChild(this.UIRoot.querySelector("#game-options-container"));
		this.UIRoot.classList.remove("game-options");
		this.dispatchEvent(StartGameEvent);
	}
}

const exports = { GameOptions };
export { GameOptions };

window.gameOptions = exports;