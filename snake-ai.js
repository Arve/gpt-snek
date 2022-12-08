class SnakeAI {
  constructor() {
    // Define the player grid dimensions
    this.gridWidth = 32;
    this.gridHeight = 24;
  }

  // Move the snake up by generating a synthetic keyboard event
  moveUp() {
    // Create a new keyboard event
    let event = new KeyboardEvent("keydown", {
      key: "ArrowUp",
      keyCode: 38,
      which: 38,
    });

    // Dispatch the event to the document object
    document.dispatchEvent(event);
  }

  // Move the snake down by generating a synthetic keyboard event
  moveDown() {
    // Create a new keyboard event
    let event = new KeyboardEvent("keydown", {
      key: "ArrowDown",
      keyCode: 40,
      which: 40,
    });

    // Dispatch the event to the document object
    document.dispatchEvent(event);
  }

  // Move the snake left by generating a synthetic keyboard event
  moveLeft() {
    // Create a new keyboard event
    let event = new KeyboardEvent("keydown", {
      key: "ArrowLeft",
      keyCode: 37,
      which: 37,
    });

    // Dispatch the event to the document object
    document.dispatchEvent(event);
  }

  // Move the snake right by generating a synthetic keyboard event
  moveRight() {
    // Create a new keyboard event
    let event = new KeyboardEvent("keydown", {
      key: "ArrowRight",
      keyCode: 39,
      which: 39,
    });

    // Dispatch the event to the document object
    document.dispatchEvent(event);
  }

  // Move the snake randomly around the screen
  // Make a move based on the current game state
  // Make a move based on the current game state
  makeMove(snake, grid) {
    // Get the current position of the snake
    let snakePos = snake.positions;
    let snakeVel = snake.velocity;
    let snakeLen = snake.length;

    // Calculate the x and y distances to the fruit
    let xDist = 0;
    let yDist = 0;
    for (let y = 0; y < this.gridHeight; y++) {
      for (let x = 0; x < this.gridWidth; x++) {
        if (grid[y][x] === 1) {
          // Calculate the x and y distances to the fruit
          xDist = x - snakePos[0][0];
          yDist = y - snakePos[0][1];
          break;
        }
      }
    }

    // Move the snake in the direction that maximizes its score
    if (Math.abs(xDist) > Math.abs(yDist)) {
      // Move the snake horizontally
      if (xDist > 0) {
        // Move the snake to the right
        if (snakeVel.x === 0) {
          this.moveRight();
        } else if (snakeVel.x === -1) {
          this.moveDown();
        } else if (snakeVel.x === 1) {
          this.moveUp();
        }
      } else {
        // Move the snake to the left
        if (snakeVel.x === 0) {
          this.moveLeft();
        } else if (snakeVel.x === -1) {
          this.moveUp();
        } else if (snakeVel.x === 1) {
          this.moveDown();
        }
      }
    } else {
      // Move the snake vertically
      if (yDist > 0) {
        // Move the snake down
        if (snakeVel.y === 0) {
          this.moveDown();
        } else if (snakeVel.y === -1) {
          this.moveRight();
        } else if (snakeVel.y === 1) {
          this.moveLeft();
        }
      } else {
        // Move the snake up
        if (snakeVel.y === 0) {
          this.moveUp();
        } else if (snakeVel.y === -1) {
          this.moveLeft();
        } else if (snakeVel.y === 1) {
          this.moveRight();
        }
      }
    }
  }
}

export default SnakeAI