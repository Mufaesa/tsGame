/// <reference path="gameObject.ts"/>
/// <reference path="util.ts"/>
/// <reference path="player.ts"/>

class Game {

    //singleton declaration
    private static instance : Game;

    private player : Player;
    private block : Block;


    public score: number = 0;

   private constructor() {
        let container = document.getElementById("container");
        this.player = new Player(container);
        this.block = new Block(container, 800);

        requestAnimationFrame(() => this.gameLoop());
    }

//singleton call
     public static getInstance() {
        if (! Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    }

    private gameLoop(){
        this.player.draw();
        this.block.draw();

        //static class implementation
        if(Util.checkCollision(this.player, this.block)){
            this.player.behaviour = new Crashing(this.player);
        } else {
            this.updateScore();
        }
        
        
        requestAnimationFrame(() => this.gameLoop());
    }

    private updateScore(){
        if(this.player.getDead() == 1){
            document.getElementById("score").innerHTML = "Score : " + Math.round(this.score) + ", press f5 to play again";
        } else {
            this.score += 0.1;
            document.getElementById("score").innerHTML = "Score : " + Math.round(this.score);
        }
    }

    public endGame(){
        console.log("endgame");
        this.player.setDead(1);
        this.player.div.classList.add("crashed");
        document.getElementById("plateau").classList.add("animationpaused");
        document.getElementById("sky").classList.add("animationpaused");
    }

    public 
} 




// load using singleton
window.addEventListener("load", function() {
    Game.getInstance();
});