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






}

export {Model}
