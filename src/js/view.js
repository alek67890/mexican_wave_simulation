import {States, Platfrom} from "./elements"


class View {
    constructor(resolution, numOfPeople) {
        console.log("constructor")
        this.getCanvas()
        this.resolution = resolution || [2000, 750];
        this.numOfPeople = numOfPeople || [25, 15];

        this.calculateSize();

        // this.size = size || [48, 48];
        // this.block_size = [Math.floor(this.resolution[0]/this.size[0]), Math.floor(this.resolution[1]/this.size[1])]
        
        this.platform = new Platfrom(...numOfPeople, ...this.size);
        this.States = new States();
        console.log(this.ctx)
    }

    calculateSize(){
        let size1 = Math.floor(this.resolution[0] / this.numOfPeople[0]);
        let size2 = Math.floor(this.resolution[1] / this.numOfPeople[1]);
        if (size1 > size2){
            this.size = [size2, size2]
        }else {
            this.size = [size1, size1]
        }

        
    }

    async getCanvas(){
        var canvas = document.getElementById('canvas');
        if (canvas.getContext) {
          var ctx = canvas.getContext('2d');
          ctx.fillStyle = 'orange';
          this.ctx = ctx;
        }
    }

    async clear() {
  
        this.ctx.fillStyle = 'orange';
        this.ctx.fillRect(0,0,...this.resolution);

    }
    

    async refreshPlatform(){
        this.platform.replaceOldMatrix();
        for (var i = 0; i < this.platform.numOfX; i++) {        
            for (var j=0; j < this.platform.numOfY; j++){
                this.drawImage(i,j,this.platform.getState(i, j))
            }
        }
    }

    async drawImage(x,y,state){
        let image = this.States.images[state];
        this.ctx.drawImage(image, ...this.platform.getPosition(x, y), this.size[0], this.size[1]);
    }

    // async drawPoint(x, y) {

    //     this.ctx.fillStyle = 'black';
    //     this.ctx.fillRect(this.size[0]*x, this.size[1]*y,this.size[0],this.size[1]);
    // }

}

export {View};
