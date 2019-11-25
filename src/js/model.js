class Model {
    constructor(platform){
        this.platform = platform;
        this.displayX = platform.numOfX;
        this.displayY = platform.numOfY;
    }

    randomStates(){
        let state = 0
        for (var i = 0; i < this.displayX; i++) {        
            for (var j = 0; j < this.displayY; j++){

                state = Math.floor(Math.random() * 5)
                this.platform.setState(i, j, state);
                
            }
        }
    }

    step(){
        for (var i = 0; i < this.displayX; i++) {        
            for (var j = 0; j < this.displayY; j++){

                this.handleActivated(i,j);
                this.prototypeActivation(i,j)

            }
        }
    }

    prototypeActivation(x, y){
        // its wrong function 
        if (this.platform.getState(x-1, y) > 1 && this.platform.getState(x, y) == 0 ){
            this.platform.setState(x, y, 1);
        }

    }

    handleActivated(x,y){
        let state = this.platform.getState(x, y);
        if (state > 0) {
            state++;
            if (state == 6){
                state = 0
            }
            this.platform.setState(x, y, state);
        }
        
    }

    init(){
        this.randomStates()
    }


}

export {Model}
