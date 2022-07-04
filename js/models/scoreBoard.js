const SCORE_KEY = "scores";
class ScoreBoard{
	constructor(storage){
		this.Storage = storage;
		this.Scores = this._getOrInit();
	}

	_getOrInit(){
		let scores = this.Storage.getItem(SCORE_KEY);
		if (scores === null){
			scores = JSON.stringify([]);
		}
		this.Scores = JSON.parse(scores);
	}

	Add(score){
		this.Scores.push(score);
		this.Storage.setItem(SCORE_KEY, JSON.stringify(this.Scores));
	}

	Remove(score){
		if (!this.Scores.includes(score)){
			return;
		}
		this.Scores.splice(this.Scores.indexOf(score),1);
		this.Storage.setItem(SCORE_KEY, JSON.stringify(this.Scores));
	}
}

const exports = { ScoreBoard };
export { ScoreBoard };

if(!window.models){
	window.models = {};
}
window.models.scoreBoard = exports;