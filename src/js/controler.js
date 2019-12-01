import {View} from "./view"
import {Model} from "./model"
import { delay } from 'q';


const MaxTime = 2000;
const MinTime = 0;
var TIME = 200;

let resolution = [1900, 750];
let numOfPeople = [80,18];


class Parms{
    constructor() {
        
        this.MaxTime = 2000;
        this.MinTime = 0;
        this.TIME = 200;
        this.resolution = [1900, 750];
        this.numOfPeople = [80,18];
        this.c = 1;
        this.w0 = 0.5;
        this.R = 1;
        this.dc = 0.1;

    }

    updateTime(neValue){
        this.TIME = this.MaxTime - neValue;
    }
}


class Controler {
    constructor() {
        this.parms = new Parms;
        this.setup()
        // this.loop();
    }
    

    setup(){
        this.createViewAndModel();
        // this.gui = new Gui;
        this.initEventHandlers();
        this.view.clear();
        this.model.init();
        this.view.refreshPlatform();
    }

    createViewAndModel(){
        this.view = new View(resolution, numOfPeople);
        this.model = new Model(this.view.platform, this.parms);
    }

    onStartClick(e){
        e.preventDefault();
        this.loop();
    }

    onRestartClick(e){
        e.preventDefault();
        window.clearInterval(this.idInterwal)
        this.model.clear();
        this.view.clear();
        this.view.refreshPlatform();
    }

    onInputClick(e){
        e.preventDefault();
        this.model.init();
    }

    onInitClick(e){
        e.preventDefault();
        this.model.init();
    }
    onPauseClick(e){
        e.preventDefault();
        window.clearInterval(this.idInterwal)
    }


    initButtons(){
        document.getElementById('resize').addEventListener("click", this.onButtonClick.bind(this));
        document.getElementById('start').addEventListener("click", this.onStartClick.bind(this));
        document.getElementById('restart').addEventListener("click", this.onRestartClick.bind(this));
        document.getElementById('init').addEventListener("click", this.onInitClick.bind(this));
        document.getElementById('pause').addEventListener("click", this.onPauseClick.bind(this));
        
    }


    initInput(){

        resolution[0] = parseInt(document.querySelector(".container-fluid").clientWidth)
        this.view.changeResolution(resolution);

        this.speed = document.getElementById('speed');
        this.speed.addEventListener("change", this.onChange.bind(this));
        
        this.c = document.getElementById('c');
        this.c.addEventListener("change", this.onChange.bind(this));

        this.dc = document.getElementById('dc');
        this.dc.addEventListener("change", this.onChange.bind(this));

        this.w0 = document.getElementById('w0');
        this.w0.addEventListener("change", this.onChange.bind(this));

        this.R = document.getElementById('r');
        this.R.addEventListener("change", this.onChange.bind(this));


        this.X = document.getElementById('X');
        this.Y = document.getElementById('Y');

        this.speed.value = 2000 - 200;
        [this.X.value, this.Y.value] = numOfPeople;
        this.onChange();
    }

    async initEventHandlers(){
        this.initButtons();
        this.initInput();     
    }




    // async initEventHandlers(){
    //     this.pressedButton = new Set([]);
    //     window.addEventListener( "keydown", this.onKeyDown.bind(this), false );
    //     window.addEventListener( "keyup", this.onKeyUp.bind(this), false );
    //     window.addEventListener( "keypress", this.onKeyPressTime.bind(this), false );

    //     document.getElementById('resize').addEventListener("click", this.onButtonClick.bind(this));
    //     document.getElementById('start').addEventListener("click", this.onStartClick.bind(this));
    //     document.getElementById('restart').addEventListener("click", this.onRestartClick.bind(this));

        

    //     resolution[0] = parseInt(document.querySelector(".container-fluid").clientWidth)
    //     this.view.changeResolution(resolution);

        
    //     this.speed = document.getElementById('speed');
    //     this.speed.addEventListener("change", this.onChange.bind(this));
        
    //     this.c = document.getElementById('c');
    //     this.c.addEventListener("change", this.onChange.bind(this));

    //     this.w0 = document.getElementById('w0');
    //     this.c.addEventListener("change", this.onChange.bind(this));


    //     this.X = document.getElementById('X');
    //     this.Y = document.getElementById('Y');

    //     this.speed.value = 2000 - 200;
    //     [this.X.value, this.Y.value] = numOfPeople;
    //     this.onChange();

    // }

    async onButtonClick(e){
        e.preventDefault();
        numOfPeople = [parseInt(this.X.value), parseInt(this.Y.value)];
        this.setup();
    }

    onChange(){
        this.parms.updateTime(this.speed.value)
        console.log(this.speed.value)
        this.speed.value = 2000 - this.parms.TIME;

        this.speed.labels[0].innerText = `Speed  = ${this.speed.value}`

        this.parms.c = parseFloat(this.c.value);
        this.c.labels[0].innerText = `Parametr c = ${this.parms.c}`

        this.parms.dc = parseFloat(this.dc.value);
        this.dc.labels[0].innerText = `Parametr dc = ${this.parms.dc}`


        this.parms.w0  = parseFloat(this.w0.value)
        this.w0.labels[0].innerText = `Parametr w0 = ${this.parms.w0}`

        this.parms.R  = parseFloat(this.R.value)
        this.R.labels[0].innerText = `Parametr R = ${this.parms.R}`

    }

    runInLoop(){
        this.model.step();
        this.view.refreshPlatform();        
    }

    async loop(){
    
        this.idInterwal = window.setInterval(() => this.runInLoop() , this.parms.TIME);
        // while (true){ 
        //     this.runInLoop();
        //     await delay(this.parms.TIME);
        // }
    }

}

export {Controler};