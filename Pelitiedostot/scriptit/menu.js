var menu = function(game){
	var menumusa;
}


menu.prototype = {

	create: function(){
		var background = this.game.add.sprite(0,0, 'menubground');
		this.menumusa = this.game.add.audio('menumusa', 0.5, true);
		this.menumusa.play();
		var dudes = this.game.add.sprite(0,0,'menupic');
		var playButton = this.game.add.button(248, 320, "play", this.playTheGame, this);
	},
	playTheGame: function(){
		this.menumusa.stop();
		this.game.state.start("Game");
	}

}