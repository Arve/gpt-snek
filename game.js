(function () {

/** Start of  ChatGPT-generated code */
const gameConfig = {
    // The dimensions of the game grid
    grid: {
        width: 32,
        height: 24
    },

    // The frame rate of the game
    fps: 15, // configured manually to make the game actually playable

    // The colors used in the game
    colorScheme: {
        // The color of the game background
        background: "#000000",

        // The color of the game gridlines
        gridlines: "#00FF00",

        // The color of the snake
        snake: "#00FF00",

        // The color of the fruit
        fruit: "#00CC00"
    }
};

const CELL_TYPE_EMPTY = 0;
const CELL_TYPE_FRUIT = 1;
const CELL_TYPE_SNAKE = 2;

// Initialize some game state variables
let lastTime = 0;
let deltaTime = 0;
let grid = [];
let hasFruit = false;
let snake;
let isPlaying = true;
let gameOver = false;

// A class to represent the snake
class Snake {
    // The constructor for the Snake class
    constructor() {
        // Set the initial position and dimensions of the snake
        this.x = gameConfig.grid.width / 2;
        this.y = gameConfig.grid.height / 2;
        // Set the initial velocity of the snake
        this.velocity = {
            x: 1,
            y: 0
        };

        // Set the initial length of the snake
        this.length = 1;

        // Initialize the array of positions for the snake
        this.positions = [[this.x, this.y]];

        // Put the snake in the grid
        grid[this.x][this.y] = CELL_TYPE_SNAKE;
    }

    // A function to update the position and dimensions of the snake
    update() {
        // Update the snake's position
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        // Check if the new position of the snake is within the bounds of the game grid
        if (this.x < 0 || this.x >= gameConfig.grid.width || this.y < 0 || this.y >= gameConfig.grid.height) {
            // Set the game over condition if the snake has moved outside of the game grid
            gameOver = true;
            return;
        }

        // Check if the new position of the snake contains a fruit
        if (grid[this.x][this.y] === CELL_TYPE_FRUIT) {
            // Increment the length of the snake if it has eaten a fruit
            this.length++;

            // Set the hasFruit variable to false
            hasFruit = false;
        }

        // Check if the new position of the snake contains itself
        if (this.positions.some(([x, y]) => x === this.x && y === this.y && (x !== this.positions[0][0] || y !== this.positions[0][1]))) {
            // Set the game over condition if the snake has collided with itself
            gameOver = true;
            return;
        }

        // Add the new position of the snake to the array of positions
        this.positions.unshift([this.x, this.y]);

        // Put the snake in the grid
        grid[this.x][this.y] = CELL_TYPE_SNAKE;

        // If the length of the snake has not increased
        if (this.positions.length > this.length) {
            // Remove the last position of the snake from the array of positions
            const [x, y] = this.positions.pop();

            // Remove the snake from the grid
            grid[x][y] = CELL_TYPE_EMPTY;
        }
    }

    // A function to check for collisions with the edges of the game grid
    checkCollision() {
        // If the snake goes beyond the left or right edges of the game grid
        if (this.x < 0 || this.x >= gameConfig.grid.width) {
            // Set the game over flag
            gameOver = true;
        }

        // If the snake goes beyond the top or bottom edges of the game grid
        if (this.y < 0 || this.y >= gameConfig.grid.height) {
            // Set the game over flag
            gameOver = true;
        }

        // If the snake collides with itself
        if (this.positions.slice(1).some(([x, y]) => x === this.x && y === this.y)) {
            // Set the game over flag
            gameOver = true;
        }
    }
}

// A function to create the game grid
function createGrid() {
    // Initialize the grid cells to be empty
    const grid = [];
    for (let x = 0; x < gameConfig.grid.width; x++) {
        grid[x] = [];
        for (let y = 0; y < gameConfig.grid.height; y++) {
            grid[x][y] = CELL_TYPE_EMPTY;
        }
    }

    // Return the grid
    return grid;
}

// A function to set up the initial game state
function setup() {
    // Create the game grid
    grid = createGrid();

    // Create the snake
    snake = new Snake();

    // Set the initial game state
    isPlaying = true;
    gameOver = false;
    hasFruit = false;

    // Spawn a fruit
    spawnFruit();

    // Start the game loop
    gameLoop();
}


// A function to place a fruit in a random empty cell in the game grid
function spawnFruit() {
    // If there is already a fruit on the playfield
    if (hasFruit) {
        // Do not spawn a new fruit
        return;
    }

    // Generate a random x and y coordinate within the game grid
    let x = Math.floor(Math.random() * gameConfig.grid.width);
    let y = Math.floor(Math.random() * gameConfig.grid.height);

    // If the cell at the random x and y coordinate is empty
    if (grid[x][y] === CELL_TYPE_EMPTY) {
        // Place a fruit in the cell at the random x and y coordinate
        grid[x][y] = CELL_TYPE_FRUIT;

        // Set the hasFruit flag to indicate that the playfield has a fruit
        hasFruit = true;
    } else {
        // Recursively call the spawnFruit function until an empty cell is found
        spawnFruit();
    }
}

function displayScore(score) {
    // Get a reference to the canvas element
    const canvas = document.getElementById("game");

    // Get a 2D rendering context for the canvas
    const ctx = canvas.getContext("2d");

    // Calculate the font size and box dimensions based on the canvas size
    const fontSize = Math.round(canvas.width / 20);
    const boxWidth = Math.round(canvas.width * 0.6);
    const boxHeight = Math.round(canvas.height * 0.2);

    // Set the font size and line height for the "Game over" text
    ctx.font = (fontSize * 2) + "px monospace";
    ctx.lineHeight = fontSize * 2; // Set the line height to twice the font size
    ctx.textBaseline = "middle"; // Center the text vertically
    ctx.textAlign = "center"; // Center the text horizontally

    // Create the "Game over" text
    const gameOverText = "Game Over!";

    // Create the score text with the "Score: " prefix
    const scoreText = "Score: " + score;

    // Calculate the position of the box in the center of the canvas
    const x = (canvas.width / 2) - (boxWidth / 2);
    const y = (canvas.height / 2) - (boxHeight / 2);

    // Set the shadow properties of the context
    ctx.shadowColor = "#000000";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    // Draw a filled rectangle using the background color from the config
    ctx.fillStyle = gameConfig.colorScheme.background;
    ctx.fillRect(x, y, boxWidth, boxHeight);

    // Set the stroke style to the gridlines color
    ctx.strokeStyle = gameConfig.colorScheme.gridlines;
    ctx.lineJoin = "round";

    // Draw the rounded rectangle around the box
    ctx.strokeRect(x, y, boxWidth, boxHeight);

    // Set the fill style to the gridlines color
    ctx.fillStyle = gameConfig.colorScheme.gridlines;

    // Set the font size for the score text
    ctx.font = fontSize + "px monospace";

    // Draw the "Game over" text at the top of the rectangle
    ctx.fillText(gameOverText, x + (boxWidth / 2), y + (boxHeight / 4));

    // Draw the score text in the center of the rectangle
    ctx.fillText(scoreText, x + (boxWidth / 2), y + (boxHeight / 2));

    // Reset the shadow properties of the context
    ctx.shadowColor = "rgba(0, 0, 0, 0)";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
}


// The game loop function
function gameLoop(timestamp) {
    // Calculate the time delta since the last frame
    deltaTime = timestamp - lastTime;

    // If the time delta is greater than the frame duration (1 / fps)
    // and the game is currently playing
    if (deltaTime > 1000 / gameConfig.fps && isPlaying) {
        // Update the game state and check for collisions
        // only if the game is not already over
        if (!gameOver) {
            snake.update();
            spawnFruit();
            snake.checkCollision();
        }

        render();

        // If the game is over, display the score in a box
        if (gameOver) {
            displayScore(snake.length);
        }

        // Save the timestamp for the next frame
        lastTime = timestamp;
    }

    // Request the next animation frame
    // only if the game is not already over
    if (!gameOver) {
        requestAnimationFrame(gameLoop);
    }
}

let currentDirection = "ArrowUp";

function handleKeyboardEvent(event) {
    // Check which key the user has pressed
    switch (event.key) {
        case "ArrowUp":
            // Check if the snake's length is greater than 1
            if (snake.length > 1) {
                // Check if the snake is already moving downwards
                if (currentDirection !== "ArrowDown") {
                    // Update the snake's velocity to move upwards
                    snake.velocity.x = 0;
                    snake.velocity.y = -1;
                    // Update the current direction of the snake
                    currentDirection = "ArrowUp";
                }
            } else {
                // Update the snake's velocity to move upwards
                snake.velocity.x = 0;
                snake.velocity.y = -1;
                // Update the current direction of the snake
                currentDirection = "ArrowUp";
            }
            break;
        case "ArrowDown":
            // Check if the snake's length is greater than 1
            if (snake.length > 1) {
                // Check if the snake is already moving upwards
                if (currentDirection !== "ArrowUp") {
                    // Update the snake's velocity to move downwards
                    snake.velocity.x = 0;
                    snake.velocity.y = 1;
                    // Update the current direction of the snake
                    currentDirection = "ArrowDown";
                }
            } else {
                // Update the snake's velocity to move downwards
                snake.velocity.x = 0;
                snake.velocity.y = 1;
                // Update the current direction of the snake
                currentDirection = "ArrowDown";
            }
            break;
        case "ArrowLeft":
            // Check if the snake's length is greater than 1
            if (snake.length > 1) {
                // Check if the snake is already moving to the right
                if (currentDirection !== "ArrowRight") {
                    // Update the snake's velocity to move to the left
                    snake.velocity.x = -1;
                    snake.velocity.y = 0;
                    // Update the current direction of the snake
                    currentDirection = "ArrowLeft";
                }
            } else {
                // Update the snake's velocity to move to the left
                snake.velocity.x = -1;
                snake.velocity.y = 0;
                // Update the current direction of the snake
                currentDirection = "ArrowLeft";
            }
            break;
        case "ArrowRight":
            // Check if the snake's length is greater than 1
            if (snake.length > 1) {
                // Check if the snake is already moving to the left
                if (currentDirection !== "ArrowLeft") {
                    // Update the snake's velocity to move to the right
                    snake.velocity.x = 1;
                    snake.velocity.y = 0;
                    // Update the current direction of the snake
                    currentDirection = "ArrowRight";
                }
            } else {
                // Update the snake's velocity to move to the right
                snake.velocity.x = 1;
                snake.velocity.y = 0;
                // Update the current direction of the snake
                currentDirection = "ArrowRight";
            }
            break;
        case " ":
            if (gameOver) {
                // If the game is in a gameOver state, call the setup function to restart the game
                setup();
            } else {
                // If the game is paused, toggle the isPlaying flag
                isPlaying = !isPlaying;
            }
            break;
    }
}


function render() {
    // Get the canvas element
    const canvas = document.getElementById("game");

    // Get the 2D canvas context
    const ctx = canvas.getContext("2d");

    // Calculate the size of a cell based on the dimensions of the canvas and the game grid
    const cellSize = canvas.width / gameConfig.grid.width;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set the fill color to the color of the background
    ctx.fillStyle = gameConfig.colorScheme.background;

    // Fill the canvas with the fill color
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set the stroke color to the color of the gridlines
    ctx.strokeStyle = gameConfig.colorScheme.gridlines;

    // Set the line width of the gridlines
    ctx.lineWidth = 1;

    // Iterate over the rows of the grid
    for (let y = 0; y < gameConfig.grid.height; y++) {
        // Iterate over the columns of the grid
        for (let x = 0; x < gameConfig.grid.width; x++) {
            // Draw the vertical gridline
            ctx.beginPath();
            ctx.moveTo(x * cellSize, 0);
            ctx.lineTo(x * cellSize, canvas.height);
            ctx.stroke();

            // Draw the horizontal gridline
            ctx.beginPath();
            ctx.moveTo(0, y * cellSize);
            ctx.lineTo(canvas.width, y * cellSize);
            ctx.stroke();

            // Check if the current cell contains a snake
            if (grid[x][y] === CELL_TYPE_SNAKE) {
                // Render the snake in the current cell
                renderSnake(ctx, x, y, cellSize);
            }
            // Check if the current cell contains a fruit
            if (grid[x][y] === CELL_TYPE_FRUIT) {
                // Render the fruit in the current cell
                renderFruit(ctx, x, y, cellSize);
            }
        }
    }
}

// Renders a snake in the specified cell
function renderSnake(ctx, x, y, cellSize) {
    // Set the fill color to the color of the snake
    ctx.fillStyle = gameConfig.colorScheme.snake;

    // Fill the cell with the fill color
    ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
}

// Renders a fruit in the specified cell
function renderFruit(ctx, x, y, cellSize) {
    // Set the fill color to the color of the fruit
    ctx.fillStyle = gameConfig.colorScheme.fruit;

    // Set the stroke color to the color of the fruit
    ctx.strokeStyle = gameConfig.colorScheme.fruit;

    // Set the line width of the fruit outline
    ctx.lineWidth = 2;

    // Calculate the x and y coordinate of the center of the cell
    const centerX = (x * cellSize) + (cellSize / 2);
    const centerY = (y * cellSize) + (cellSize / 2);

    // Calculate the radius of the heart shape
    const radius = cellSize / 3;

    // Draw the heart shape
    ctx.beginPath();
    ctx.moveTo(centerX - radius, centerY);
    ctx.bezierCurveTo(centerX - radius, centerY - radius, centerX, centerY - radius, centerX, centerY - radius / 2);
    ctx.bezierCurveTo(centerX, centerY - radius, centerX + radius, centerY - radius, centerX + radius, centerY);
    ctx.bezierCurveTo(centerX + radius, centerY + radius / 2, centerX, centerY + radius / 2, centerX, centerY + radius / 2);
    ctx.bezierCurveTo(centerX, centerY + radius, centerX - radius, centerY + radius / 2, centerX - radius, centerY);
    ctx.closePath();

    // Fill the heart shape with the fill color
    ctx.fill();

    // Stroke the heart shape with the stroke color
    ctx.stroke();
}


// Add an event listener for keyboard events
document.addEventListener("keydown", handleKeyboardEvent);

/** End of ChatGPT-generated code */


window.addEventListener('load', () => {
    // Start the game loop
    setup();
})

})();