import _ from 'lodash';

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

    handleActivated(x,y){
        let state = this.platform.getState(x, y);
        if (state > 0) {
            state += 0.5;
            if (state == 6){
                state = 0
            }
            this.platform.setState(x, y, state);
        }
    }

    getState(x,y){
        return this.platform.getState(x,y)
    }

    setState(x, y, state){
        this.platform.setState(x, y, 1);
    }

    isActive(x,y){
        let state = this.getState(x,y);
        return (state>=1 && state<=3)
    }
    dist (x, y){
        return Math.abs(x) + Math.abs(y)
    }

    calK(){
        let R = 2;
        let A = []
        for (let i=0; this.dist(i,0)<R; i++){
            for (let j=0; this.dist(j,0)<R; j++){
                if (this.dist(i,j)<=R){
                    A.push([i,j])
                }
            }
        }
        let AA = []
        A.forEach((x)=>{
        AA.push([x[0], x[1] ]);
        AA.push([x[0],-x[1] ]);
        AA.push([-x[0], x[1] ]);
        AA.push([-x[0], -x[1] ]);
        })
        
        let AAA = _.uniqWith(AA, _.isEqual);
        AAA.shift()
        return AAA
    }

    prototypeActivation(x, y){
        // its wrong function 
        if ((this.isActive(x - 1, y    ) ||
             this.isActive(x    , y - 1) || 
             this.isActive(x    , y + 1) ) && this.getState(x, y) == 0 ){
            this.setState(x, y, 1);
        }
        
        // this.isActive(this.platform.getState(x + 1, y    )) || 
  


    }
    Activation(x,y){

        if (this.getState(x,y) == 0){

            let influence = this.calK();
            
            let K = 8.0;
            let w0 = 0.9;
            let R = 2;
            let w = [];
            for (let index in influence){
                let i = influence[index][0];
                let j = influence[index][1];
                let gamma = Math.atan2(y,x);
                // console.log(this.dist(i,j));
                if ( (this.dist(i,j) > 0)  && ( this.dist(i,j) < 3*R)    &&  this.isActive(i + x,j + y) ){
                    w[index] = K **(-1) * Math.exp(this.dist(i,j)) * (1 + w0 + (1 - w0)* Math.cos(Math.PI - gamma )) ;
                }else {
                    w[index] = 0.0;
                }            
                
            }
            let sumW = w.reduce((a, b) => a + b ,0) 
            if (sumW > 2){    
                // console.log(sumW)
                this.setState(x,y,1)
            }
        }
            

    }   

    init(){
        for (let i = 10; i<18; i++){
            for (let j = 2; j<10; j++){
                this.platform.setState(i, j, 1);
            }
        }

        // this.platform.setState(10, 5, 1);
        // this.platform.setState(10, 8, 1);
        // this.platform.setState(10, 13, 1);
        // this.randomStates()
    }

    step(){
        for (var i = 0; i < this.displayX; i++) {        
            for (var j = 0; j < this.displayY; j++){

                this.handleActivated(i, j);
                // this.prototypeActivation(i, j)
                this.Activation(i, j)

            }
        }
    }

}

export {Model}
