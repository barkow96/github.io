import Coordinates from "./Coordinates.js";

//CLASS THAT REPRESENTS GAMEBOARD
export default class GameBoard {
    constructor(CTX, X_SQUARE, Y_SQUARE, WIDTH, GB_COLOR, SNAKE_COLOR, FRUIT_COLOR) {
        this.CTX = CTX;

        this.GB_COLOR = GB_COLOR;
        this.SNAKE_COLOR = SNAKE_COLOR;
        this.FRUIT_COLOR = FRUIT_COLOR;

        this.X_SQUARE = X_SQUARE;
        this.Y_SQUARE = Y_SQUARE;
        this.WIDTH = WIDTH;

        this.height = Y_SQUARE*WIDTH/X_SQUARE;
        this.squareSize = WIDTH/X_SQUARE;

        canvas.width = window.innerWidth/2;
        canvas.height = Y_SQUARE*WIDTH/X_SQUARE;

        this.coordinates = new Array(X_SQUARE);    
        this.generateCoordinates();
        
        this.items = new Array(X_SQUARE);
        this.generateItems();
    }

    //RENDERING ELEMENTS ON THE GAMEBOARD
    draw() {
        this.CTX.beginPath();
        this.CTX.rect(0, 0, this.WIDTH, this.height);
        this.CTX.fillStyle = "black";
        this.CTX.fillRect(0, 0, this.WIDTH, this.height);
        this.CTX.closePath();

        for (let i=0; i<this.X_SQUARE; i++) {
            for (let j=0; j<this.Y_SQUARE; j++) {
                this.CTX.beginPath();
                this.CTX.fillStyle = this.GB_COLOR;
                this.CTX.fillRect(i*this.squareSize, j*this.squareSize, this.squareSize, this.squareSize);
                this.CTX.stroke();
                this.CTX.closePath();
            }
        }

        this.items.forEach((item1, index1) => {
            item1.forEach((item2, index2) => {
                if (item2 === "S") {
                    this.CTX.beginPath();
                    this.CTX.fillStyle = this.SNAKE_COLOR;
                    this.CTX.fillRect(this.coordinates[index1][index2].x, this.coordinates[index1][index2].y, this.squareSize, this.squareSize);
                    this.CTX.closePath();
                } else if (item2 === "F") {
                    this.CTX.beginPath();
                    this.CTX.fillStyle = this.FRUIT_COLOR;
                    this.CTX.fillRect(this.coordinates[index1][index2].x, this.coordinates[index1][index2].y, this.squareSize, this.squareSize);
                    this.CTX.closePath();
                }
            })
        })
    }

    //INITIALIZING COORDINATES ARRAY
    generateCoordinates() {
        for (let i=0; i<this.coordinates.length; i++) this.coordinates[i] = new Array(this.Y_SQUARE);

        for (let i=0; i<this.X_SQUARE; i++) {
            for (let j=0; j<this.Y_SQUARE; j++) this.coordinates[i][j] = new Coordinates(i*this.squareSize, j*this.squareSize);
        }
    }

    //INITIALIZING ITEMS ARRAY
    generateItems() {
        for (let i=0; i<this.coordinates.length; i++) this.items[i] = new Array(this.Y_SQUARE);

        for (let i=0; i<this.X_SQUARE; i++) {
            for (let j=0; j<this.Y_SQUARE; j++) this.items[i][j] = "0";
        }
    }

    //UPDATING SNAKE POSITIONS AND CHECKING FOR COLLISIONS WITH ITSELF AND WITH FRUITS
    assimilateSnake(coords) {
        const x = coords.x;
        const y = coords.y;
        const length = x.length;
        let growthPossible = false;

        if (this.items[x[0]][y[0]] == "S") gameOver = true;
        if (this.items[x[0]][y[0]] == "F") growthPossible = true;

        for (let i=0; i<this.X_SQUARE; i++) {
            for (let j=0; j<this.Y_SQUARE; j++) {
                if (this.items[i][j] == "S") this.items[i][j] = "0"
            }
        }
        
        for (let i=0; i<length; i++) this.items[x[i]][y[i]] = "S";

        return growthPossible;
    }

    //ADDING FRUIT TO THE GAMEBOARD
    assimilateFruit(coords) {
        const x = coords[0];
        const y = coords[1];
        this.items[x][y] = "F";   
    }

    //CHECKING IF (X,Y) POSITION ON THE GAMEBOARD IS UNOCCUPIED
    checkIfEmpty(x,y) {
        if (this.items[x][y] == "0") return true;

        return false;
    }
}