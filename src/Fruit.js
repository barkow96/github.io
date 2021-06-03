//CLASS THAT REPRESENTS FRUIT
export default class Fruit {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    //REPORTING CURRENT POSITIONS OF FRUIT
    reportCurrentPositions() {
        return [this.x, this.y];
    }
}
