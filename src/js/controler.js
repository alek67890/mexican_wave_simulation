import {View} from "./view"
import {Model} from "./model"


class Parms{
    constructor() {
    
        this.delay = 200;
        this.resolution = [1900, 750];
        this.numOfPeople = [80,18];
        this.c = 0.25;
        this.w0 = 0.5;
        this.R = 2;
        this.dc = 0.1;
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
        this.view = new View(this.parms.resolution, this.parms.numOfPeople);
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

        this.parms.resolution[0] = parseInt(document.querySelector(".container-fluid").clientWidth)
        this.view.changeResolution(this.parms.resolution);

        this.delayElement = document.getElementById('speed');
        this.delayElement.addEventListener("change", this.onChange.bind(this));
        
        this.cElement = document.getElementById('c');
        this.cElement.addEventListener("change", this.onChange.bind(this));

        this.dcElement = document.getElementById('dc');
        this.dcElement.addEventListener("change", this.onChange.bind(this));

        this.w0Element = document.getElementById('w0');
        this.w0Element.addEventListener("change", this.onChange.bind(this));

        this.R_Element = document.getElementById('r');
        this.R_Element.addEventListener("change", this.onChange.bind(this));

        this.X_Element = document.getElementById('X');
        this.Y_Element = document.getElementById('Y');

        this.defaultValue();
    }

    defaultValue(){
        this.delayElement.value = this.parms.delay;
        [this.X_Element.value, this.Y_Element.value] = this.parms.numOfPeople;

        this.cElement.value  = this.parms.c; 
        this.dcElement.value = this.parms.dc;
        this.w0Element.value = this.parms.w0;
        this.R_Element.value = this.parms.R;
        
        this.onChange();
    }

    async initEventHandlers(){
        this.initButtons();
        this.initInput();     
    }

    async onButtonClick(e){
        e.preventDefault();
        this.parms.numOfPeople = [parseInt(this.X_Element.value), parseInt(this.Y_Element.value)];
        this.setup();
    }

    onChange(){

        this.parms.delay = this.delayElement.value 
        this.delayElement.labels[0].innerText = `Time delay between steps  = ${this.delayElement.value}`

        this.parms.c = parseFloat(this.cElement.value);
        this.cElement.labels[0].innerText = `Parametr c = ${this.parms.c}`

        this.parms.dc = parseFloat(this.dcElement.value);
        this.dcElement.labels[0].innerText = `Parametr dc = ${this.parms.dc}`

        this.parms.w0  = parseFloat(this.w0Element.value)
        this.w0Element.labels[0].innerText = `Parametr w0 = ${this.parms.w0}`

        this.parms.R  = parseFloat(this.R_Element.value)
        this.R_Element.labels[0].innerText = `Parametr R = ${this.parms.R}`

    }

    runInLoop(){
        this.model.step();
        this.view.refreshPlatform();        
    }

    async loop(){
        try {
            window.clearInterval(this.idInterwal)
        }
        finally {
            this.idInterwal = window.setInterval(() => this.runInLoop() , this.parms.delay);
        }
    }

}

export {Controler};