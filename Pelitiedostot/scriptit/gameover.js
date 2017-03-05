var gameover = function(game){
	finalscore = null;
}


gameover.prototype = {

	init: function(score){
		finalscore = score;
	},

	create: function(){
		var background = this.game.add.sprite(0,0, 'retrybground');
		var dudees = this.game.add.sprite(0,0,'retrypic');
		var yourscore = this.game.add.text(204, 200, 'FINAL CREW SIZE: ' + finalscore, {font:'700 24px Cabin', fill: '#ff6200'})

		var playButton = this.game.add.button(248, 320, "retry", this.playTheGame, this);

		var playButton = this.game.add.button(242, 400, "menu", this.backToMenu, this);

		var playButton = this.game.add.button(192, 480, "submit", this.submitScore, this);
	},
	playTheGame: function(){
		this.game.state.start("Game");
	},

	backToMenu: function(){
		this.game.state.start("Menu");
	},

	submitScore: function(){
		var msg = {
    		"messageType": "SCORE",
    		"score": finalscore
  		};
  		window.parent.postMessage(msg, "*");
	}
	

}

