import Snake from "./Snake.js";
import Fruit from "./Fruit.js";
import GameBoard from "./GameBoard.js";

//ELEMENTS SELECTORS
const scoreElement = document.querySelector("#scoreElement");
const startGameBtn = document.querySelector("#startGameBtn");
const modalElement = document.querySelector("#modalElement");
const difficulty = document.querySelector("#difficulty");

//CANVAS
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

//DIMENSIONS
const X_SQUARES = 17;
const Y_SQUARES = 13;
const WIDTH = window.innerWidth/2;

//COLORS
const GB_COLOR = "brown";
const SNAKE_COLOR = "green";
const FRUIT_COLOR = "orange";

//GAME SETTINGS
let fps = 8;
let fruit_rate = 1.5*fps;

//OTHER VARIABLES
let gameOver = false;

//INITIALIZING THE GAME STATE
let gb = new GameBoard(ctx, X_SQUARES, Y_SQUARES, WIDTH, GB_COLOR, SNAKE_COLOR, FRUIT_COLOR);
let snake = new Snake(X_SQUARES, Y_SQUARES);
let fruits = [];
gb.draw();

//FUNCTION FOR RE-INITIALIZATION THE GAME STATE
const init = () => {
    gb = new GameBoard(ctx, X_SQUARES, Y_SQUARES, WIDTH, GB_COLOR, SNAKE_COLOR, FRUIT_COLOR);
    snake = new Snake(X_SQUARES, Y_SQUARES);
    fruits = [];
    gb.draw();

    gameOver = false;
    snakeCollision = false;
    wallCollision = false;
    iterator = 0;
}

//FUNCTION THAT REPRESENTS THE MAIN LOOP OF THE GAME
let growthPossible;
let snakeCollision;
let wallCollision;
let snakeState;
let xFruit, yFruit;
let iterator = 0;
const animate = () => {
    const interval = setInterval(() => {
        if (gameOver == false) {
            growthPossible = false;
            snakeCollision = false;
            wallCollision = false;

            snakeState = gb.assimilateSnake(snake.reportCurrentPositions());
            snakeCollision = snakeState[0];
            growthPossible = snakeState[1];
            if (growthPossible) snake.grow();
    
            if (iterator%Math.floor(fruit_rate) == 0) {
                do {
                    xFruit = Math.floor(Math.random()*X_SQUARES);
                    yFruit = Math.floor(Math.random()*Y_SQUARES);
                } while (!gb.checkIfEmpty(xFruit, yFruit))
                
    
                fruits.push(new Fruit(xFruit, yFruit));
                gb.assimilateFruit(fruits[fruits.length-1].reportCurrentPositions());
            }
    
            gb.draw();
            wallCollision = snake.update();
            
            if (snakeCollision || wallCollision) gameOver = true;
        } else {
            clearInterval(interval);
            modalElement.style.display = "flex";
        }
    
        iterator++;
        scoreElement.innerHTML = snake.score.toString();
    }, 1000/fps);
}

//EVENT LISTENER FOR STARTING THE GAME
startGameBtn.addEventListener("click", () => {
    switch(difficulty.value) {
        case "noob":
            fps = 3;
            break;
        case "casual":
            fps = 8;
            break;
        case "expert":
            fps = 20;
            break;
    }
    fruit_rate = 1.5*fps;

    init();
    animate();
    modalElement.style.display = "none";
});

//EVENT LISTENER FOR PLAYER MOVEMENTS
window.addEventListener("keydown", (event) => {
    const directions = Object.values(snake.DIRECTIONS);
    const DIRECTIONS = snake.DIRECTIONS;
    const key = event.key.toLowerCase();

    directions.forEach(direction => {
        if (key == direction && snake.changePossible == true) {
            if ((key == DIRECTIONS.LEFT && snake.direction != DIRECTIONS.RIGHT) ||
            (key == DIRECTIONS.RIGHT && snake.direction != DIRECTIONS.LEFT) ||
            (key == DIRECTIONS.UP && snake.direction != DIRECTIONS.DOWN) ||
            (key == DIRECTIONS.DOWN && snake.direction != DIRECTIONS.UP)) {snake.direction = direction; snake.changePossible = false;}
        }
    });
});
