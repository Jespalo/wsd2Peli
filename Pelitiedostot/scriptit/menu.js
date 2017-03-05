var menu = function(game){
	var menumusa;
	this.loadedscore;
}

menu.prototype = {

	init: function(loadedscore){
		loadscore = loadedscore;
	},

	create: function(){
		var background = this.game.add.sprite(0,0, 'menubground');
		this.menumusa = this.game.add.audio('menumusa', 0.5, true);
		this.menumusa.play();
		var dudes = this.game.add.sprite(0,0,'menupic');
		var playButton = this.game.add.button(248, 260, "play", this.playTheGame, this);
		var yourscore = this.game.add.text(235, 320, "Saved score: " + this.loadedscore, {font:'700 16px Cabin', fill: '#ff6200'});
	},
	
	playTheGame: function(){
		this.menumusa.stop();
		console.log(this.loadedscore);
		this.game.state.start("Game",true,false, this.loadscore);
	},

}