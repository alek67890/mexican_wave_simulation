import {View} from "./view"
import {Model} from "./model"
import { delay } from 'q';


const MaxTime = 2000;
const MinTime = 0;
var TIME = 200;

let resolution = [1900, 750];
let numOfPeople = [80,18];


class Controler {
    constructor() {
        this.setup()
        this.loop();
    }
    

    setup(){
        this.createViewAndModel();
        this.initEventHandlers();
        this.view.clear();
        this.model.init();
    }

    createViewAndModel(){
        this.view = new View(resolution, numOfPeople);
        this.model = new Model(this.view.platform);
    }

    async initEventHandlers(){
        this.pressedButton = new Set([]);
        window.addEventListener( "keydown", this.onKeyDown.bind(this), false );
        window.addEventListener( "keyup", this.onKeyUp.bind(this), false );
        window.addEventListener( "keypress", this.onKeyPressTime.bind(this), false );

        document.getElementById('resize').addEventListener("click", this.onButtonClick.bind(this));
        

        

        resolution[0] = parseInt(document.querySelector(".container-fluid").clientWidth)
        this.view.changeResolution(resolution);

        
        this.speed = document.getElementById('speed');
        this.speed.addEventListener("change", this.onChange.bind(this));
        
        this.c = document.getElementById('c');
        this.c.addEventListener("change", this.onChange.bind(this));

        this.X = document.getElementById('X');
        this.Y = document.getElementById('Y');

        this.speed.value = 2000 - 200;
        [this.X.value, this.Y.value] = numOfPeople;
        this.onChange();

    }
    async onButtonClick(e){
        e.preventDefault();
        numOfPeople = [parseInt(this.X.value), parseInt(this.Y.value)];
        this.setup();
    }

    onChange(){
        console.log(this.speed.value)
        TIME = 2000 - this.speed.value;
        this.speed.value = 2000 - TIME;

        this.speed.labels[0].innerText = `Speed  = ${this.speed.value}`

        this.cValue = this.c.value;
        this.c.labels[0].innerText = `Parametr c = ${this.cValue}`

    }

    onKeyPressTime(e){
        if (e.key == '-'){
            TIME += 10
        };
        if (e.key == '+'){
            TIME -= 10
        };
        TIME = TIME > MaxTime ? MaxTime : TIME;
        TIME = TIME < MinTime ? MinTime : TIME;
        this.speed.value = 2000 - TIME;
        console.log(`${1000/TIME}hz`)
    }

    onKeyDown(e){
        this.pressedButton = new Set([e.key, ...this.pressedButton]);
    }

    onKeyUp(e){
        this.pressedButton.delete(e.key);
    }

    runInLoop(){
        this.model.step();
        this.view.refreshPlatform();        
    }

    async loop(){
        while (true){ 
            this.runInLoop();
            console.log(`${[...this.pressedButton].join(' ')}`)
            await delay(TIME);
        }
    }

}

export {Controler};