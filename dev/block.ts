/// <reference path="gameObject.ts"/>

class Block extends gameObject {

    public speed:number;
    public div:HTMLElement;
    public x:number;
    public y:number;
            
    constructor(parent:HTMLElement, x: number) {
        super("block", parent, x, 240);


        this.height = 31;
        this.width = 32;

        this.speed = -4;
   
    }

    public draw():void {
        this.x += this.speed;
        this.div.style.transform ="translate("+this.x+"px,"+this.y+"px)";
    }

}