let uri = {
    0 : '../src/img/state0_LARGE.jpg',
    1 : '../src/img/state1_LARGE.jpg',
    2 : '../src/img/state2_LARGE.jpg',
    3 : '../src/img/state3_LARGE.jpg',
    4 : '../src/img/state4_LARGE.jpg',
    5 : '../src/img/state5_LARGE.jpg',
}

class States {
    constructor(){
        this.loadImages()
    }

    loadImages(sources, callback) {
        this.images = {};
        var loadedImages = 0;
        var numImages = 0;
        // get num of sources
        for(var src in uri) {
          numImages++;
        }
        for(var src in uri) {
            this.images[src] = new Image();
            this.images[src].src = uri[src];
        }
      }
    
    
}


class Person {
    constructor(x,y) {
        this.x = x || 0;
        this.y = y || 0;
        this.state = 0;
    }

    setState(state){
        this.state = state;
    }

    getState(){
        return(this.state);
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
        
        this.matrix = matrix;
    }

    getPosition(x,y){
        return [this.matrix[x][y].x , this.matrix[x][y].y]
    }

    getState(x,y){
        return this.matrix[x][y].getState()
    }

    setState(x,y, state){
        this.matrix[x][y].setState(state);
    }

}

export {States, Platfrom};