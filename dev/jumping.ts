class Jumping implements Behaviour{

    private player:Player;
    private jumpDirection: number;

    constructor(p:Player){
        this.player = p;
        this.jumpDirection = -4;
    }
    draw(){
        this.player.x += this.player.speed;
        this.player.y += this.jumpDirection;
        if (this.player.y < 50) this.jumpDirection = 4;
        if (this.player.y > 140){
            this.player.behaviour = new Running(this.player);
        } 
    }

    onkeydown(){
        
    }
}