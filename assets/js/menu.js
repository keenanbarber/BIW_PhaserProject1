var Menu = {
	preload: function() {
		// Loading the images is required so that later on we can create sprites based on them. 
		// The first argument is how our image will be refered to, 
		// with the second argument being the path to the file. 
		game.load.image('menu', './assets/images/menu.png')
	}, 

	create: function() {
		// Add a sprite to your game, here the sprite will be the game's logo. 
		// Parameters are: X, Y, image name
		// FOR SPRITES: this.add.sprite(0, 0, 'menu');

		this.add.button(0, 0, 'menu', this.startGame, this);
	}, 

	startGame: function() {
		this.state.start('Game');
	}
};