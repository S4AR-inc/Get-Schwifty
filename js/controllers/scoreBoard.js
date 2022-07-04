class ScoreBoard{
	constructor(model, maxScores, scoringFunction, sortDirection){
		this.Model = model;
		this.MaxScores = maxScores;
		this.ScoringFunction = scoringFunction;
		this.SortDirection = sortDirection;
	}
	
	Add(score){
		score.score = this.ScoringFunction(score);

		this.Model.Add(score);
		if(this.Model.Scores.length > this.MaxScores){
			let toRemove = this.Model.Scores
				.sort((firstScore,secondScore) => this.SortDirection * (firstScore.score - secondScore.score))
				.slice(this.MaxScores + 1);
			toRemove.forEach(score => this.Model.Remove(score));
		}
		
	}
}

const exports = { ScoreBoard };
export { ScoreBoard };

if(!window.controllers){
	window.controllers = {};
}
window.controllers.scoreBoard = exports;