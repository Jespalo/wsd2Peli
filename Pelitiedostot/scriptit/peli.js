var thegame = function(game){
	this.score = 0;
	var scoreText;
	var player;
	var cursors;
	var pickup;
	var pickupsound;
	var music;
	var crash;
	this.speed = 32;

	this.currentMovement = 2;
	this.movement = {
		'UP': 1,
		'RIGHT': 2,
		'DOWN': 4,
		'LEFT': 8,
	};
	this.lastUpdate = 0;
};

thegame.prototype = {



preload: function() {
	this.game.load.spritesheet('playerpic', 'kuvat/playersprite.png', 32, 32);
	this.game.load.spritesheet('pickup', 'kuvat/pickupsprite.png', 32, 32);
	this.game.load.image('background', 'kuvat/background.png');
	this.game.load.image('saveButton', 'kuvat/saveButton.png');
},

pickupCollect: function(player, pickup) {

	this.score += 1;
    this.scoreText.text = 'Crew size: ' + this.score;

    this.pickup.x = Math.round(Math.random() * (this.game.width/32 -1))*32;
    this.pickup.y = Math.round(Math.random() * (this.game.height/32 -1))*32;

    while (this.takenCoords(this.pickup.x, this.pickup.y)){
    	this.pickup.x = Math.round(Math.random() * (this.game.width/32 -1))*32;
    	this.pickup.y = Math.round(Math.random() * (this.game.height/32 -1))*32;
    }

},


checkOutOfBounds: function() {
			
			if(this.player[0].x + 32 > 608 || this.player[0].x < 0) {
				return true;
			}
			if(this.player[0].y + 32 > 608 || this.player[0].y < 0) {
				return true;
			}
			return false;
},

isColliding: function(a, b) {
			if(a.body.hitTest(b.x, b.y) || a.body.hitTest(b.x +31, b.y + 31) || a.body.hitTest(b.x, b.y +31) || a.body.hitTest(b.x + 31, b.y)) {
				return true;
			}
			return false;
},

isCollidingSelf: function() {
			for(var i = 1; i < this.player.length; i++) {
				if(this.player[0].body.hitTest(this.player[i].x, this.player[i].y) && i !== 1) {
					return true;
				}
			}
			return false;
},

timeStamp: function() {
	
	return new Date().getTime();
},



create: function() {

	this.game.physics.startSystem(Phaser.Physics.ARCADE);

	this.game.add.sprite(0, 0, 'background');
	
	this.pickup = this.game.add.sprite(Math.round(Math.random() * (this.game.width/32 -1))*32, Math.round(Math.random() * (this.game.height/32 -1))*32, 'pickup');
	
	// sounds

	this.music = this.game.add.audio('music', 1.0, true);
	this.crash = this.game.add.audio('crash');

	this.pickupsound = this.game.add.audio('pickupsound', 0.5, false);
	this.pickupsound.startTime = 1;
	this.pickupsound.stopTime = 3;
	
	this.music.play();


	// player regarding stuff

	this.player = [];

	this.increaseLength();
	this.increaseLength();

	this.game.physics.arcade.enable(this.player[0]);

	// pickups regarding stuff

	this.pickup.animations.add('everytime', [0,1,2,3,4,5], 8, true);

	this.pickup.enableBody = true;


	// score
	this.score = this.loadedscore;
	this.scoreText = 0;
	this.scoreText = this.game.add.text(10, 10, this.scoreText, {font:'700 24px Cabin', fill: '#ff6200'});

	var saveButton = this.game.add.button(520, 10, "saveButton", this.saveGame, this);

	//
	this.cursors = this.game.input.keyboard.createCursorKeys();



},

increaseLength: function() {
			
			var x = ((this.game.width/32-1)*16)+32;
			var y = ((this.game.height/32-1)*16)+32;
			
			if(this.player.length !== 0) {
				x = this.player[this.player.length-1].x;
				y = this.player[this.player.length-1].y;
			}
			var gang = this.game.add.sprite(x, y, 'playerpic');
			this.game.physics.arcade.enable(gang); 
			gang.animations.add('up', [0,1], 8, true);
			gang.animations.add('left', [2,3], 8, true);
			gang.animations.add('down', [4,5], 8, true);
			gang.animations.add('right', [6,7], 8, true);
			
			this.player.push(gang);

			this.pickupsound.play();
},

updateMovement: function() {
	if (this.cursors.left.isDown && this.currentMovement != this.movement.RIGHT && this.player[1].x + 32 != this.player[0].x){
		this.currentMovement = this.movement.LEFT;
	}

	else if (this.cursors.right.isDown && this.currentMovement != this.movement.LEFT && this.player[1].x - 32 != this.player[0].x){
		this.currentMovement = this.movement.RIGHT;
	}

	else if (this.cursors.up.isDown && this.currentMovement != this.movement.DOWN && this.player[1].y + 32 != this.player[0].y){
		this.currentMovement = this.movement.UP;
	}

	else if (this.cursors.down.isDown && this.currentMovement != this.movement.UP && this.player[1].y - 32 != this.player[0].y){
		this.currentMovement = this.movement.DOWN;		
	}
},

contains: function(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
},


takenCoords: function(x, y) {
	var xs = [];
	var ys = [];
	for (var i = 0; i < this.player.length; i++){
		xs += this.player[i].x;
		ys += this.player[i].y;
	}
	if (this.contains(xs, x) && this.contains(ys, y)) {
		return true;
	}
},

saveGame: function() {
	this.game.paused = true;
	var msg = {
    "messageType": "SAVE",
    "gameState": {
      "score": this.score
    }
  };
  window.parent.postMessage(msg, "*");
},

update: function() {

	//lose conditions

	if(this.checkOutOfBounds()){
		this.music.stop();
		this.crash.play();
		this.game.state.start("GameOver",true,false,this.score);
	}

	if(this.isCollidingSelf()){
		this.music.stop();
		this.crash.play();
		this.game.state.start("GameOver",true,false,this.score);
	}

	//player movement

	this.updateMovement();

	if((this.timeStamp() - this.lastUpdate) < this.updateSpeed) {
		return;
	}

	this.lastUpdate = this.timeStamp();
	this.updateSpeed = 200 - (this.score*2)

	var oldX, oldY;
	for (var i = 0; i < this.player.length; i++){
		var x = this.player[i].x;
		var y = this.player[i].y;
		if(i !== 0) {
			if(x > oldX){ this.player[i].animations.play('left'); }
			if(x < oldX){ this.player[i].animations.play('right'); }
			if(y > oldY){ this.player[i].animations.play('up'); }
			if(y < oldY){ this.player[i].animations.play('down'); }
			this.player[i].x = oldX;
			this.player[i].y = oldY;
		}
		oldX = x;
		oldY = y;
	}


	if(this.currentMovement == this.movement.UP){
			this.player[0].y -= this.speed;
			this.player[0].animations.play('up');
	}
	else if (this.currentMovement == this.movement.RIGHT){
			this.player[0].x += this.speed;
			this.player[0].animations.play('right');
	}
	else if (this.currentMovement == this.movement.DOWN){
			this.player[0].y += this.speed;
			this.player[0].animations.play('down');
	}
	else if(this.currentMovement == this.movement.LEFT){
			this.player[0].x -= this.speed;
			this.player[0].animations.play('left');
	}


	// picking up pickups

	if(this.isColliding(this.player[0], this.pickup)) {
				this.increaseLength();
				this.pickupCollect(this.player, this.pickup);
	}

	this.pickup.animations.play('everytime');



},






};








