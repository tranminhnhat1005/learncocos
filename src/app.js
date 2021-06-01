var Obj = {
	//global objects
	EnemiesDirection: [],
	Enemies: [],
	Square: null,
	Title: null,
	gameTime: null,
	gameTimeInfo: null,
	gameTimeTotal: null,
	gameBestInfo: null,
	gameBestValue: null,
	gameInfo1: null,
	gameInfo2: null,
	soundInfo: null
};

var timePlayed = 0; //game time
var isAlive = false; //is the game is running
function moveSquare(destination) {
	//move the green square to destination
	var size = cc.director.getWinSize();
	if (destination.x > 0 && destination.x < size.width)
		if (destination.y > 0 && destination.y < size.height)
			//check if square is inside the screen
			Obj.Square.setPosition(destination); //if ok, move it
}

function gameStart() {
	//game start, hide texts
	isAlive = true;
	timePlayed = 0;
	Obj.Title.setVisible(false);
	Obj.gameTimeInfo.setVisible(false);
	Obj.gameTimeTotal.setVisible(false);
	Obj.gameBestInfo.setVisible(false);
	Obj.gameBestValue.setVisible(false);
	Obj.gameInfo1.setVisible(false);
	Obj.gameInfo2.setVisible(false);
}

function gameOver() {
	//game over, check score
	isAlive = false;
	Obj.Title.setVisible(true);
	Obj.gameTimeInfo.setVisible(true);
	Obj.gameTimeTotal.setVisible(true);
	Obj.gameBestInfo.setVisible(true);
	Obj.gameBestValue.setVisible(true);
	Obj.gameInfo1.setVisible(true);
	Obj.gameInfo2.setVisible(true);

	Obj.gameTimeTotal.setString(timePlayed.toFixed(3));

	Obj.Square.setPosition(cc.p(400, 225)); //move enemies to default location
	Obj.Enemies[0].setPosition(cc.p(100, 100));
	Obj.Enemies[1].setPosition(cc.p(700, 100));
	Obj.Enemies[2].setPosition(cc.p(700, 350));
	Obj.Enemies[3].setPosition(cc.p(100, 350));

	var bestTime = parseFloat(Obj.gameBestValue.getString()); //get best time
	if (timePlayed > bestTime) {
		//check the game time
		localStorage.setItem('bestTime', timePlayed); //if is a new best time, save it
		Obj.gameBestValue.setString(timePlayed.toFixed(3)); //and show it
	}
}
var GameLayer = cc.Layer.extend({
	//main scene
	ctor: function () {
		// 1. super init first
		this._super();

		var eventListener = cc.EventListener.create({
			//event listener
			event: cc.EventListener.TOUCH_ONE_BY_ONE, //one click
			swallowTouches: true, //is onTouch return true, stop event propagation
			onTouchBegan: this.onTouchBegan, //callbacks
			onTouchMoved: this.onTouchMoved
		});

		this.addSquares(); //add enemies square
		this.addTexts(); //add texts

		cc.eventManager.addListener(eventListener, Obj.Square); //start the event listener

		for (var i = 0; i < 4; i++)
			Obj.EnemiesDirection[i] = this.generateDirection(); //generate a random movement direction

		this.scheduleUpdate(); //runs update() every frame
	},

	update: function (dt) {
		//update callback, run every frame
		if (!isAlive)
			//if is not running, stop
			return;
		timePlayed += dt; //add dt to game time
		Obj.gameTime.setString(timePlayed.toFixed(3)); //update game time label

		var size = cc.director.getWinSize(); //get win size

		for (var i = 0; i < 4; i++) {
			//move the enemies
			var pos = Obj.Enemies[i].getPosition();

			if (pos.x <= 0 || pos.x >= size.width)
				//the enemy position will be relative with his direction rect
				Obj.EnemiesDirection[i] = cc.p(Obj.EnemiesDirection[i].x * -1, Obj.EnemiesDirection[i].y);
			
            if (pos.y <= 0 || pos.y >= size.height)
                Obj.EnemiesDirection[i] = cc.p(Obj.EnemiesDirection[i].x, Obj.EnemiesDirection[i].y * -1);
            
			Obj.Enemies[i].setPosition(cc.pAdd(Obj.EnemiesDirection[i], pos));
		}
		this.checkCollision(); //check collisions
	},

	checkCollision: function () {
		//create a rect to represent our green square
        var rectHero = cc.rect(
            Obj.Square.getPositionX() - (Obj.Square.getContentSize().width / 2) * Obj.Square.getScaleX(),
			Obj.Square.getPositionY() - (Obj.Square.getContentSize().height / 2) * Obj.Square.getScaleY(),
			Obj.Square.getContentSize().width * Obj.Square.getScaleX(),
			Obj.Square.getContentSize().height * Obj.Square.getScaleY()
		);

		for (var i = 0; i < 4; i++) {
			//create a rect for each enemy
            var rectEnemy = cc.rect(
                Obj.Enemies[i].getPositionX() - (Obj.Enemies[i].getContentSize().width / 2) * Obj.Enemies[i].getScaleX(),
				Obj.Enemies[i].getPositionY() - (Obj.Enemies[i].getContentSize().height / 2) * Obj.Enemies[i].getScaleY(),
				Obj.Enemies[i].getContentSize().width * Obj.Enemies[i].getScaleX(),
				Obj.Enemies[i].getContentSize().height * Obj.Enemies[i].getScaleY()
			);
			if (cc.rectIntersectsRect(rectHero, rectEnemy)) {
				//check collision
				gameOver(); //if ok, gameover
				return;
			}
		}
	},

	onTouchBegan: function (touch, event) {
		//touchbegan callback

		var target = event.getCurrentTarget();
		var PosInScreen = target.convertToNodeSpace(touch.getLocation());
		var Size = target.getContentSize();
		var rect = cc.rect(0, 0, Size.width, Size.height);
        
		if (cc.rectContainsPoint(rect, PosInScreen)) {
			//check if i'm clicking in the green square
			switch (target.getTag()) {
				case 1:
					if (!isAlive) {
						//if the game is not running
						gameStart(); //start it
						moveSquare(cc.p(400, 225)); //make sure to start the game at the center of the screen
					}
					return true;
			}
		}
		return false;
	},

	onTouchMoved: function (touch, event) {
		//touchmoved callback
		var target = event.getCurrentTarget();
		var PosInScreen = target.convertToNodeSpace(touch.getLocation());
		var Size = target.getContentSize();
        var rect = cc.rect(0, 0, Size.width, Size.height);
        if (!isAlive) {
			//if is not running, go away
			return;
        }

		if (cc.rectContainsPoint(rect, PosInScreen)) {
			//check if clicked in the green square
			switch (target.getTag()) {
				case 1:
					moveSquare(touch._point); //move the square
					return true;
			}
		}
		return false;
	},

	addTexts: function () {
		//add the texts to the screen
		var bestTime = localStorage.getItem('bestTime'); //load the best time from localStorage
		Obj.Title = cc.LabelTTF.create('Slide & Survive', res.font_title, 40);
		Obj.Title.setPosition(cc.p(400, 350));
		this.addChild(Obj.Title);

		Obj.gameTime = cc.LabelTTF.create('0.000', res.font_title, 20);
		Obj.gameTime.setPosition(cc.p(50, 10));
		this.addChild(Obj.gameTime);

		Obj.gameTimeInfo = cc.LabelTTF.create('Time: ', res.font_title, 26);
		Obj.gameTimeInfo.setPosition(cc.p(200, 225));
		this.addChild(Obj.gameTimeInfo);

		Obj.gameTimeTotal = cc.LabelTTF.create('0.000', res.font_title, 26);
		Obj.gameTimeTotal.setPosition(cc.p(300, 225));
		this.addChild(Obj.gameTimeTotal);

		Obj.gameBestInfo = cc.LabelTTF.create(
			'Best time: ',
			res.font_title,
			26
		);
		Obj.gameBestInfo.setPosition(cc.p(540, 225));
		this.addChild(Obj.gameBestInfo);

		//check if there is a bestTime, if not set the default as 0
		Obj.gameBestValue = cc.LabelTTF.create(
			bestTime ? parseFloat(bestTime).toFixed(3) : '0.000',
			res.font_title,
			26
		);
		Obj.gameBestValue.setPosition(cc.p(650, 225));
		this.addChild(Obj.gameBestValue);

		Obj.gameInfo1 = cc.LabelTTF.create(
			'Move the green square avoiding contact with the red ones!',
			res.font_title,
			20
		);
		Obj.gameInfo1.setPosition(cc.p(400, 310));
		this.addChild(Obj.gameInfo1);

		Obj.gameInfo2 = cc.LabelTTF.create(
			'Are you able to do it???',
			res.font_title,
			20
		);
		Obj.gameInfo2.setPosition(cc.p(440, 290));
		this.addChild(Obj.gameInfo2);

		var useSound = localStorage.getItem('Sound');
		if (useSound == 1) {
			cc.audioEngine.playMusic(res.music_default, true);
		} else {
			if (useSound != 0) {
				localStorage.setItem('Sound', 1);
				useSound = 1;
			}
		}
		Obj.soundInfo = cc.MenuItemFont.create(
			useSound == 1 ? 'Disable sound' : 'Enable Sound',
			this.SoundClicked,
			this
		);
		Obj.soundInfo.setFontSize(20);

		var Menu = cc.Menu.create(Obj.soundInfo);
		Menu.setPosition(680, 20);
		this.addChild(Menu);
	},

	SoundClicked: function () {
		var enabled = localStorage.getItem('Sound');
		if (enabled == 1) {
			cc.audioEngine.stopMusic(true);
			localStorage.setItem('Sound', 0);
			Obj.soundInfo.setString('Enable sound');
		} else {
			cc.audioEngine.playMusic(res.music_default, true);
			localStorage.setItem('Sound', 1);
			Obj.soundInfo.setString('Disable sound');
		}
	},

	addSquares: function () {
		//add the squares to the scene
		Obj.Square = cc.Sprite.create(res.img_square_green);
		Obj.Square.setPosition(cc.p(400, 225));
		Obj.Square.setTag(1);

		this.addChild(Obj.Square);

		var En = Obj.Enemies;
		for (var i = 0; i < 4; i++) {
			En[i] = cc.Sprite.create(res.img_square_red);
			this.addChild(En[i]);
		}
        En[0].setPosition(cc.p(100, 100));
        En[0].setScaleX(0.2);
		En[0].setScaleY(0.3);

		En[1].setPosition(cc.p(700, 100));
		En[1].setScaleX(0.7);
		En[1].setScaleY(0.1);

		En[2].setPosition(cc.p(700, 350));
		En[2].setScaleX(0.1);
		En[2].setScaleY(0.5);

		En[3].setPosition(cc.p(100, 350));
		En[3].setScale(0.2);

		Obj.Enemies = En;
	},

	generateDirection: function () {
		//generate a random direction
		var i = Math.floor(Math.random() * 3);
		var v = 1;
		switch (i) {
			case 0:
				return cc.p(v, v);
			case 1:
				return cc.p(-v, v);
			case 2:
				return cc.p(-v, -v);
			case 3:
				return cc.p(v, -v);
		}
		return cc.p(0, 0);
	}
});

var GameScene = cc.Scene.extend({
	//create the scene and start the game
	onEnter: function () {
		this._super();
		var layer = new GameLayer();
		this.addChild(layer);
	}
});
