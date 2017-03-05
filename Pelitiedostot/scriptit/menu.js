var menu = function(game){
	var menumusa;
	this.loadedscore = 0;
}


menu.prototype = {

	create: function(){
		var background = this.game.add.sprite(0,0, 'menubground');
		this.menumusa = this.game.add.audio('menumusa', 0.5, true);
		this.menumusa.play();
		this.loadedscore = 0;
		var dudes = this.game.add.sprite(0,0,'menupic');
		var playButton = this.game.add.button(248, 260, "play", this.playTheGame, this);
		var loadButton = this.game.add.button(272, 320, "load", this.loadLoad, this);
		var yourscore = this.game.add.text(250, 350, "Loaded score:" + this.loadedscore, {font:'700 16px Cabin', fill: '#ff6200'});
	},
	
	playTheGame: function(){
		this.menumusa.stop();
		console.log(this.loadedscore);
		this.game.state.start("Game",true,false,this.loadedscore);
	},
	
	loadLoad: function(){
  		window.addEventListener("message", function(evt) {
  			if (evt.data.messageType === "LOAD") {
    			this.loadedscore = parseInt(evt.data.gameState.score);
    			console.log("LOAD responded to!" + parseInt(evt.data.gameState.score));
   			} else if (evt.data.messageType === "ERROR") {
   				alert(evt.data.info);
   			}
		});		
  		var msg = {
    		"messageType": "LOAD_REQUEST",
  		};
  		window.parent.postMessage(msg, "*");
	},

}