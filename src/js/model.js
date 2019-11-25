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

    
    // displayStates(){
    //     let state = 0
    //     for (var i = 0; i < this.displayX; i++) {        
    //         for (var j = 0; j < this.displayY; j++){

    //             state = ???????
    //             this.platform.setState(i, j, state);
                
    //         }
    //     }
    // }



    step(){
        for (var i = 0; i < this.displayX; i++) {        
            for (var j = 0; j < this.displayY; j++){

                this.handleActivated(i,j);

            }
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



}

export {Model}
