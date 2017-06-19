var Menu = {
	preload: function() {
		// Loading the images is required so that later on we can create sprites based on them. 
		// The first argument is how our image will be refered to, 
		// with the second argument being the path to the file. 
		game.load.image('menu', './assets/images/menu.png');
	}, 

	create: function() {
		// Add a sprite to your game, here the sprite will be the game's logo. 
		// Parameters are: X, Y, image name
		// FOR SPRITES: this.add.sprite(0, 0, 'menu');

		this.add.button(0, 0, 'menu', this.startGame, this);

		game.scale.pageAlignVertically = true; 
		game.scale.pageAlignHorizontally = true; 
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

		if (/Mobile|Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
		    console.log("This is running on a mobile device. ");
		}
		else {
			console.log("This is not running on a mobile device. ");
		}
	}, 

	startGame: function() {
		this.state.start('Game');
	}
};