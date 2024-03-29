import {States, Platfrom} from "./elements"


class View {
    constructor(resolution, numOfPeople) {
        this.resolution = resolution || [2000, 750];
        this.numOfPeople = numOfPeople || [25, 15];
        this.getCanvas()
        this.calculateSize();

        this.platform = new Platfrom(...numOfPeople, ...this.size);
        this.States = new States();
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

    changeResolution(newResolution){
        this.resolution = newResolution;
        this.calculateSize();
        this.platform.resize(...this.size)
    }

    async getCanvas(){
        var canvas = document.getElementById('canvas');
        if (canvas.getContext) {
          var ctx = canvas.getContext('2d');
          ctx.fillStyle = 'orange';
          this.ctx = ctx;
          canvas.width = this.resolution[0];
          canvas.height = this.resolution[1];
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
                this.drawImage(i,j,Math.floor(this.platform.getState(i, j)))
            }
        }
    }

    async drawImage(x,y,state){
        let image = this.States.images[state];
        this.ctx.drawImage(image, ...this.platform.getPosition(x, y), this.size[0], this.size[1]);
    }

    async drawPoint(x, y, state) {
        // draw color point insted image. Not used.
        switch(state) {
            case 0:
                this.ctx.fillStyle = 'black';
                break;
            case 1:
                this.ctx.fillStyle = "red";
                break;
            case 2:
                this.ctx.fillStyle = "yellow";
                break;
            case 3:
                this.ctx.fillStyle = "white";
                break;
            case 4:
                this.ctx.fillStyle = "yellow";
                break;
            case 5:
                this.ctx.fillStyle = "red";
                break;
        }
        this.ctx.fillRect(...this.platform.getPosition(x, y), this.size[0], this.size[1]);
    }

}

export {View};
