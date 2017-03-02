var preload = function(game){}
 
preload.prototype = {
	preload: function(){ 
		this.game.load.image("loadbar", "kuvat/loadbar.png")
          var loadingBar = this.add.sprite(160,240,"loadbar");
          loadingBar.anchor.setTo(0.5,0.5);
          this.load.setPreloadSprite(loadingBar);
		this.game.load.image("menu","kuvat/menu.png");
		this.game.load.image("play","kuvat/Play.png");
		this.game.load.image("retry","kuvat/Retry.png");
		this.game.load.image("menubground", "kuvat/menubackground.png")
		this.game.load.image("retrybground", "kuvat/retrybackground.png")
		this.game.load.audio("music", "aanet/musa.mp3")
		this.game.load.audio("pickupsound", "aanet/pickup.mp3")
		this.game.load.audio("crash", "aanet/car_crash.mp3")
		this.game.load.audio("menumusa", "aanet/menumusa.mp3")
		this.game.load.image("menupic", "kuvat/menupic.png")
		this.game.load.image("retrypic", "kuvat/retrypic.png")
		this.game.load.image("submit", "kuvat/submitScore.png")
	},
  	create: function(){
		this.game.state.start("Menu");
	}

}