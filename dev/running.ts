class Running implements Behaviour{

    player:Player;

    constructor(p:Player){
        this.player = p
    }
    draw(){
        this.player.x += this.player.speed;
    }

    onkeydown(){
        this.player.behaviour = new Jumping(this.player);
    }

}