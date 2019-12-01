import _ from 'lodash';


class Model {
    constructor(platform, parms){
        this.platform = platform;
        this.parms = parms
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
            // state += 0.5;
            state += 1;
            if (state == 6){
                state = 0
            }
            this.platform.setState(x, y, state);
        }
    }

    randomC(){
        for (var i = 0; i < this.displayX; i++) {        
            for (var j = 0; j < this.displayY; j++){
                let dC = this.parms.dc;

                let newC = Math.random() * dC * 2 + (this.parms.c - dC); 
                this.platform.setC(i, j, newC)
                
            }
        }
    }

    getState(x,y){
        return this.platform.getState(x,y)
    }

    setState(x, y, state){
        this.platform.setState(x, y, state);
    }

    isActive(x,y){
        let state = this.getState(x,y);
        return (state>=1 && state<=3)
    }
    dist (x, y){
        return Math.sqrt(x**2+ y**2)
        // return Math.abs(x) + Math.abs(y)
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

            let w0 = this.parms.w0;
            let R = this.parms.R;
            
            
            let influence = this.influence;
            
            
            let w = [];
            for (let index in influence){
                let i = influence[index][0];
                let j = influence[index][1];
                let alpha = Math.atan2(j,i);
                // console.log(this.dist(i,j));
                if ( (this.dist(i,j) > 0)  && ( this.dist(i,j) < 3*R) ){
                    w[index] =  Math.exp(-1.0 * this.dist(i,j)/(R))
                    w[index] =  w[index]  * 0.5 * (1.0 + w0 + (1 - w0)* Math.cos(Math.PI - alpha )) ;
                }else {
                    w[index] = 0.0;
                }            
                
            }
            let sumW = w.reduce((a, b) => a + b ,0) 

            let w2 = w.map( x => x/sumW )

            let sumW2 = w2.reduce((total, currentValue, Index) =>
            {
                let i = influence[Index][0];
                let j = influence[Index][1];
                if (this.isActive(i + x,j + y)){
                    return total += currentValue;
                }
                else {
                    return total;
                }

            } ,0)
            

            if (sumW2 > this.platform.getC(x,y)){    
                // console.log(sumW/sumW2)
                // console.log(w)
                this.setState(x,y,1)
            }
        }
            

    }   
    
    init(){
        for (let i = 11; i<17; i++){
            for (let j = 6; j<12; j++){
                this.platform.setState(i, j, 1);
            }
        }

        this.randomC()
        this.influence = this.calK();

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

    clear(){
        for (var i = 0; i < this.displayX; i++) {        
            for (var j = 0; j < this.displayY; j++){
                this.setState(i,j,0)
            }
        }
    }
    
    calK(){
        let R = this.parms.R;
        let CutOff = 3 * R;
        let A = []
        for (let i=0; this.dist(i,0)<CutOff; i++){
            for (let j=0; this.dist(j,0)<CutOff; j++){
                if (this.dist(i,j)<=CutOff){
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
}

export {Model}
