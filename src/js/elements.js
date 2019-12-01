import { cloneDeep } from 'lodash';

let uri = {
    0 : './img/state0_LARGE.jpg',
    1 : './img/state1_LARGE.jpg',
    2 : './img/state2_LARGE.jpg',
    3 : './img/state3_LARGE.jpg',
    4 : './img/state4_LARGE.jpg',
    5 : './img/state5_LARGE.jpg',
}

class States {
    constructor(){
        this.loadImages()
    }

    loadImages(sources, callback) {
        this.images = {};
        for(var srcIndex in uri) {
            this.images[srcIndex] = new Image();
            this.images[srcIndex].src = uri[srcIndex];
        }
      }
    
    
}


class Person {
    constructor(x,y) {
        this.x = x || 0;
        this.y = y || 0;
        this.state = 0;
        this.c = 0;
    }

    setState(state){
        this.state = state;
    }

    getState(){
        return(this.state);
    }


    setC(c){
        this.c = c;
    }

    getC(){
        return(this.c);
    }


    setPosition(x,y){
        this.x = x;
        this.y = y;
    }

}

class Platfrom{
    constructor(numOfX, numOfY, sizeX, sizeY,){
        this.numOfX = numOfX || 20;
        this.numOfY = numOfY || 10;

        this.sizeX = sizeX || 45;
        this.sizeY = sizeY || sizeX || 45;


        this.createMatrix();
    }

    createMatrix(){
        let matrix = new Array(this.numOfX);
        for (var i = 0; i < this.numOfX; i++) {
            
            matrix[i] = new Array(this.numOfY);
            
            for (var j=0; j < this.numOfY; j++){
                matrix[i][j] = new Person(i*this.sizeX, j*this.sizeY)
            }
            
        }
        
        this.currentMatrix = matrix;
        this.nextMatrix = cloneDeep(this.currentMatrix)
    }

    resize(sizeX, sizeY){
        this.sizeX = sizeX;
        this.sizeY = sizeY;

        for (var i = 0; i < this.numOfX; i++) {
            for (var j=0; j < this.numOfY; j++){
                this.currentMatrix[i][j].setPosition(i*this.sizeX, j*this.sizeY);
                this.nextMatrix[i][j].setPosition(i*this.sizeX, j*this.sizeY);
            }
            
        }
    }

    getPosition(x,y){
        [x, y] = this.handleOverflowVariable(x,y)
        return [this.currentMatrix[x][y].x , this.currentMatrix[x][y].y]
    }

    getState(x,y){
        [x, y] = this.handleOverflowVariable(x,y)
        return this.currentMatrix[x][y].getState()
    }

    setState(x,y, state){
        [x, y] = this.handleOverflowVariable(x,y)
        this.nextMatrix[x][y].setState(state);
    }

    setC(x, y, c){
        this.nextMatrix[x][y].setC(c);
        this.currentMatrix[x][y].setC(c);
    }

    getC(x, y){
        return(this.currentMatrix[x][y].getC(c));
    }


    handleOverflowVariable(x,y){
        x = (x >= this.numOfX) ? x -(Math.floor(x/this.numOfX) * this.numOfX) : x;
        // y = (y >= this.numOfY) ? y -(Math.floor(y/this.numOfY) * this.numOfY) : y; 
        y = (y >= this.numOfY) ? this.numOfY-1 : y; 

        x = (x < 0) ? x - (Math.floor(x/this.numOfX) * this.numOfX) : x;
        // y = (y < 0) ? y - (Math.floor(y/this.numOfY) * this.numOfY) : y;
        y = (y < 0) ? 0 : y;

        return [x , y]
    }


    replaceOldMatrix(){
        
        this.currentMatrix = cloneDeep(this.nextMatrix)
    }

}

export {States, Platfrom};