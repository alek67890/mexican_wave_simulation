import _ from 'lodash';


class Model {
    constructor(platform, parms){
        this.platform = platform;
        this.parms = parms
        this.displayX = platform.numOfX;
        this.displayY = platform.numOfY;
    }

    randomStates(){
        //unused function that generates random state
        let state = 0
        for (var i = 0; i < this.displayX; i++) {        
            for (var j = 0; j < this.displayY; j++){
                state = Math.floor(Math.random() * 5)
                this.setState(i, j, state);
            }
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
    }
    
    
    init(){
        for (let i = 11; i<17; i++){
            for (let j = 6; j<12; j++){
                this.platform.setState(i, j, 1);
            }
        }
        this.randomC()
        this.neighbors = this.findNeighbors();
    }
    
    
    clear(){
        for (var i = 0; i < this.displayX; i++) {        
            for (var j = 0; j < this.displayY; j++){
                
                this.setState(i,j,0)
            }
        }
    }
    

    handleActivated(x,y){
        let state = this.getState(x, y);
        if (state > 0) {
            state += 1;
            if (state == 6){
                state = 0
            }
            this.setState(x, y, state);
        }
    }
    
    findNeighbors(){
        let R = this.parms.R;
        let CutOff = 3 * R;
        let vectors = []
        for (let i=0; this.dist(i,0)<CutOff; i++){
            for (let j=0; this.dist(j,0)<CutOff; j++){
                if (this.dist(i,j)<=CutOff){
                    vectors.push([i,j])
                }
            }
        }
        let multiVectors = []
        vectors.forEach((x)=>{
            multiVectors.push([x[0], x[1] ]);
            multiVectors.push([x[0],-x[1] ]);
            multiVectors.push([-x[0], x[1] ]);
            multiVectors.push([-x[0], -x[1] ]);
        })
        
        let uniqeMultiVectors = _.uniqWith(multiVectors, _.isEqual);
        uniqeMultiVectors.shift() // delete vector (0.0)
        
        return uniqeMultiVectors
    }
    
    
    Activation(x, y){
        
        if (this.getState(x,y) == 0){
            
            let w0 = this.parms.w0;
            let R = this.parms.R;
            
            
            let neighbors = this.neighbors;
            
            
            let w = [];
            for (let index in neighbors){
                let xi = neighbors[index][0];
                let yi = neighbors[index][1];
                let alpha = Math.atan2(yi,xi);
                // console.log(this.dist(i,j));
                if ( (this.dist(xi,yi) > 0)  && ( this.dist(xi,yi) < 3*R) ){
                    w[index] =  Math.exp(-1.0 * this.dist(xi,yi)/(R))
                    w[index] =  w[index]  * 0.5 * (1.0 + w0 + (1 - w0)* Math.cos(Math.PI - alpha )) ;
                }else {
                    w[index] = 0.0;
                }            
                
            }
            let sumW = w.reduce((total, currentValue) => total + currentValue ,0)  // calulate sum
            
            let w2 = w.map( x => x/sumW )
            
            let sumW2 = w2.reduce((total, currentValue, index) =>       // calulate sum when is active
            {
                let i = neighbors[index][0];
                let j = neighbors[index][1];
                if (this.isActive(i + x,j + y)){
                    return total += currentValue;
                }
                else {
                    return total;
                }
                
            } ,0)
            
            
            if (sumW2 > this.platform.getC(x,y)){    
                this.setState(x,y,1)
            }
        }
    }

    step(){
        for (var i = 0; i < this.displayX; i++) {        
            for (var j = 0; j < this.displayY; j++){
                
                this.handleActivated(i, j);
                this.Activation(i, j)
            }
        }
    }
}

export {Model}
