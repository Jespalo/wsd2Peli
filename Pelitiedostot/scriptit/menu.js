var menu = function(game){
	var menumusa;
	var loadedscore;
}

window.addEventListener("message", function(evt) {
  	if (evt.data.messageType === "LOAD") {
    	loadedscore = evt.data.gameState.score;
    	console.log("LOAD responded to!" + evt.data.gameState.score);
   	} else if (evt.data.messageType === "ERROR") {
   		alert(evt.data.info);
   	}
	});

menu.prototype = {


	create: function(){
		var background = this.game.add.sprite(0,0, 'menubground');
		this.menumusa = this.game.add.audio('menumusa', 0.5, true);
		this.menumusa.play();
		loadedscore = 0;
		var dudes = this.game.add.sprite(0,0,'menupic');
		var playButton = this.game.add.button(248, 260, "play", this.playTheGame, this);
		var loadButton = this.game.add.button(272, 320, "load", this.playLoad, this);
	},
	
	playTheGame: function(){
		this.menumusa.stop();
		this.game.state.start("Game");
	},
	
	playLoad: function(){
  		var msg = {
    		"messageType": "LOAD_REQUEST",
  		};
  		window.parent.postMessage(msg, "*");
  		console.log("Nappipaino:" + loadedscore);
  		this.game.state.start("Game", true, false, this.loadedscore);
  		console.log("Aloitetaan scorella:" + loadedscore);
	},

}