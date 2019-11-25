import {View} from "./view"
import {Model} from "./model"
import { delay } from 'q';


const MaxTime = 2000;
const MinTime = 0;
var TIME = 200;

const resolution = [1000, 750];
const numOfPeople = [30,20];


class Controler {
    constructor() {
        this.setup()
        this.loop();
    }

    setup(){
        this.createViewAndModel();
        this.initEventHandlers();
        this.view.clear();
    }

    createViewAndModel(){
        this.view = new View(resolution, numOfPeople);
        this.model = new Model(this.view.platform);
    }

    initEventHandlers(){
        this.pressedButton = new Set([]);
        window.addEventListener( "keydown", this.onKeyDown.bind(this), false );
        window.addEventListener( "keyup", this.onKeyUp.bind(this), false );
        window.addEventListener( "keypress", this.onKeyPressTime.bind(this), false );
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
        console.log(`${1000/TIME}hz`)
    }



    onKeyDown(e){
        this.pressedButton = new Set([e.key, ...this.pressedButton]);
    }

    onKeyUp(e){
        this.pressedButton.delete(e.key);
    }


    run(){
        this.model.randomStates();
        this.view.refreshPlatform();        
    }


    async loop(){
        while (true){ 
            this.run();
            console.log(`${[...this.pressedButton].join(' ')}`)
            await delay(TIME);
        }
    }

}

export {Controler};