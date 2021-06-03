//CLASS THAT REPRESENTS THE PLAYER
export default class Snake {
    constructor(X_SQUARES, Y_SQUARES) {
        this.X_SQUARES = X_SQUARES;
        this.Y_SQUARES = Y_SQUARES;
        this.x = [Math.floor(X_SQUARES/2), Math.floor(X_SQUARES/2), Math.floor(X_SQUARES/2)];
        this.y = [Math.floor(Y_SQUARES/2), Math.floor(Y_SQUARES/2)-1, Math.floor(Y_SQUARES/2)-2];

        this.DIRECTIONS = {
            "LEFT": "a",
            "RIGHT": "d",
            "DOWN": "s",
            "UP": "w",
        }
        this.direction = this.DIRECTIONS.DOWN;
        this.changePossible = true;

        this.score = 0;
    }

    //UPDATING SNAKE POSITIONS ACCORDING TO PLAYER MOVEMENT
    update() {
        let gameOver = false;
        const prevX = [...this.x];
        const prevY = [...this.y];

        let xModifier, yModifier = 0;
        switch (this.direction) {
            case this.DIRECTIONS.LEFT:
                xModifier = -1;
                yModifier = 0; 
                break;
            case this.DIRECTIONS.RIGHT:
                xModifier = 1;
                yModifier = 0; 
                break;
            case this.DIRECTIONS.UP:
                xModifier = 0;
                yModifier = -1; 
                break;
            case this.DIRECTIONS.DOWN:
                xModifier = 0;
                yModifier = 1; 
                break;
        }

        for (let i=0; i<this.x.length; i++) {
            if (i==0) {
                this.x[i] = this.x[i] + xModifier;
                this.y[i] = this.y[i] + yModifier;
                if (!(this.x[i] >=0 && this.x[i] <= this.X_SQUARES-1) || !(this.y[i] >=0 && this.y[i] <= this.Y_SQUARES-1)) gameOver = true;
            } else {
                this.x[i] = prevX[i-1];
                this.y[i] = prevY[i-1];
            }
        }

        this.changePossible = true;
        return gameOver;
    }

    //INCREASING SNAKE'S SIZE
    grow() {
        const length = this.x.length;
        const xMovement = this.x[length-2]-this.x[length-1];
        const yMovement = this.y[length-2]-this.y[length-1];

        this.x.push(-xMovement);
        this.y.push(-yMovement);
        this.score += 100;
    }

    //REPORTING CURRENT POSITIONS OF SNAKE
    reportCurrentPositions() {
        return {
            x: this.x,
            y: this.y
        };
    }
}
