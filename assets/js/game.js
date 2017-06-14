var snake, apple, squareSize, score, speed, updateDelay, direction, new_direction, 
	addNew, cursors, scoreTextValue, speedTextValue, textStyle_Key, textStyle_Value;

var Game = {
	preload: function() {
		game.load.image('snake', './assets/images/snake.png');
		game.load.image('apple', './assets/images/apple.png');
	}, 

	create: function() {
		snake = [];
		apple = {}; 
		squareSize = 15; 
		score = 0; 
		speed = 0; 
		updateDelay = 0; 
		direction = 'right';
		new_direction = null; 
		addNew = false;

		// Set up a Phaser controller for keyboard input. 
		cursors = game.input.keyboard.createCursorKeys(); 

		game.stage.backgroundColor = '#061f27'; 

		// Generate the initial snake stack. Our snake will be 10 elements long.
		// Beginning at X=10 Y=150 and increasing the X on every iteration. 
		for(var i = 0; i < 10; i++) {
			snake[i] = game.add.sprite(150+i*squareSize, 150, 'snake'); // X, Y, image
		}

		// The first apple generated. 
		this.generateApple();

		// Add text to the top of the game.
		textStyle_Key = {font: "bold 14px sans-serif", fill: "#46c0f9", align: "center"};
		textStyle_Value = {font: "bold 18px sand-serif", fill: "#fff", align: "center"};

		// Score 
		game.add.text(30, 20, "SCORE", textStyle_Key);
		scoreTextValue = game.add.text(90, 18, score.toString(), textStyle_Value); 

		// Speed
		game.add.text(500, 20, "SPEED", textStyle_Key);
		speedTextValue = game.add.text(558, 18, speed.toString(), textStyle_Value); 
	}, 

	update: function() {
		if (cursors.right.isDown && direction!='left') {
	        new_direction = 'right';
	    }
	    else if (cursors.left.isDown && direction!='right') {
	        new_direction = 'left';
	    }
	    else if (cursors.up.isDown && direction!='down') {
	        new_direction = 'up';
	    }
	    else if (cursors.down.isDown && direction!='up') {
	        new_direction = 'down';
	    }

	    // A formula to calculate the game's speed based on the score. 
	    // The higher the score, the higher the game speed, with a maximum of 10.
	    speed = Math.min(10, Math.floor(score/5));
	    // Update speed value on the screen. 
	    speedTextValue.text = '' + speed;

	    // Since the update function of Phaser has an update rate of around 60 fps, 
	    // we need to slow that down to make the game playable. 

	    // Increase a counter on every update call. 
	    updateDelay++;

	    // Do game stuff only if the counter is aliquot to (10 - the game speed). 
	    // The higher the speed, the more frequently this is fulfilled, 
	    // making the snake move faster. 

	    if(updateDelay % (10 - speed) == 0) {
	    	// Snake movement

	    	var firstCell = snake[snake.length - 1], 
	    		lastCell = snake.shift(), 
	    		oldLastCellx = lastCell.x, 
	    		oldLastCelly = lastCell.y;

	    	// If a new direction has been chosen from the keyboard, make it the direction of the snake now. 
	    	if(new_direction) {
	    		direction = new_direction; 
	    		new_direction = null;
	    	}

	    	// Change the last cell's coordinates relative to the head of the snake, according to the direction. 
	    	if(direction == 'right') {
	    		lastCell.x = firstCell.x + 15; 
	    		lastCell.y = firstCell.y;
	    	}
	    	else if(direction == 'left'){
	            lastCell.x = firstCell.x - 15;
	            lastCell.y = firstCell.y;
	        }
	        else if(direction == 'up'){
	            lastCell.x = firstCell.x;
	            lastCell.y = firstCell.y - 15;
	        }
	        else if(direction == 'down'){
	            lastCell.x = firstCell.x;
	            lastCell.y = firstCell.y + 15;
	        }

	        // Place the last cell in the front of the stack.
	        // Mark it the first cell.

	        snake.push(lastCell);
	        firstCell = lastCell;


	        
		    if(addNew) {
		    	snake.unshift(game.add.sprite(oldLastCellx, oldLastCelly, 'snake'));
		    	addNew = false;
		    }

		    // Check for apple collision. 
		    this.appleCollision();

		    // Check for collision with self. Parameter is the head of the snake. 						!
		    this.selfCollision(firstCell);

		    // Check with collision with wall. Parameter is the head of the snake. 						!
		    this.wallCollision(firstCell);
	    }



	},

	generateApple: function() {
		// Choose a random place on the grid. 
		// X is between 0 and 585 (39*15)
		// Y is between 0 and 435 (29*15)

		var randomX = Math.floor(Math.random() * 40 ) * squareSize, 
			randomY = Math.floor(Math.random() * 30 ) * squareSize;

		// Add a new apple. 
		apple = game.add.sprite(randomX, randomY, 'apple');
	},

	appleCollision: function() {

	    // Check if any part of the snake is overlapping the apple.
	    // This is needed if the apple spawns inside of the snake.
	    for(var i = 0; i < snake.length; i++){
	        if(snake[i].x == apple.x && snake[i].y == apple.y){

	            // Next time the snake moves, a new block will be added to its length.
	            addNew = true;

	            // Destroy the old apple.
	            apple.destroy();

	            // Make a new one.
	            this.generateApple();

	            // Increase score.
	            score++;

	            // Refresh scoreboard.
	            scoreTextValue.text = score.toString();

	        }
	    }

	},

	selfCollision: function(head) {

	    // Check if the head of the snake overlaps with any part of the snake.
	    for(var i = 0; i < snake.length - 1; i++){
	        if(head.x == snake[i].x && head.y == snake[i].y){

	            // If so, go to game over screen.
	            game.state.start('Game_Over');
	        }
	    }

	},

	wallCollision: function(head) {

	    // Check if the head of the snake is in the boundaries of the game field.

	    if(head.x >= 600 || head.x < 0 || head.y >= 450 || head.y < 0){

	        // If it's not in, we've hit a wall. Go to game over screen.
	        game.state.start('Game_Over');
	    }

	}
};