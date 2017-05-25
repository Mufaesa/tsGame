var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var gameObject = (function () {
    function gameObject(str, parent, x, y) {
        this.div = document.createElement(str);
        parent.appendChild(this.div);
        this.x = x;
        this.y = y;
    }
    return gameObject;
}());
var Block = (function (_super) {
    __extends(Block, _super);
    function Block(parent, x) {
        var _this = _super.call(this, "block", parent, x, 240) || this;
        _this.height = 31;
        _this.width = 32;
        _this.speed = -4;
        return _this;
    }
    Block.prototype.draw = function () {
        this.x += this.speed;
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
    };
    return Block;
}(gameObject));
var Util = (function () {
    function Util() {
    }
    Util.checkCollision = function (object1, object2) {
        return (object1.x < object2.x + object2.width &&
            object1.x + object1.width > object2.x &&
            object1.y < object2.y + object2.height &&
            object1.height + object1.y > object2.y);
    };
    return Util;
}());
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(parent) {
        var _this = _super.call(this, "player", parent, 100, 143) || this;
        _this.deadState = 0;
        _this.behaviour = new Running(_this);
        _this.speed = 0;
        _this.height = 128;
        _this.width = 60;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        return _this;
    }
    Player.prototype.onKeyDown = function (e) {
        console.log(e.key);
        this.behaviour.onkeydown();
    };
    Player.prototype.setDead = function (deadState) {
        this.deadState = deadState;
    };
    Player.prototype.getDead = function () {
        return this.deadState;
    };
    Player.prototype.draw = function () {
        this.behaviour.draw();
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
    };
    return Player;
}(gameObject));
var Game = (function () {
    function Game() {
        var _this = this;
        this.score = 0;
        var container = document.getElementById("container");
        this.player = new Player(container);
        this.block = new Block(container, 800);
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Game.getInstance = function () {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.player.draw();
        this.block.draw();
        if (Util.checkCollision(this.player, this.block)) {
            this.player.behaviour = new Crashing(this.player);
        }
        else {
            this.updateScore();
        }
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.updateScore = function () {
        if (this.player.getDead() == 1) {
            document.getElementById("score").innerHTML = "Score : " + Math.round(this.score) + ", press f5 to play again";
        }
        else {
            this.score += 0.1;
            document.getElementById("score").innerHTML = "Score : " + Math.round(this.score);
        }
    };
    Game.prototype.endGame = function () {
        console.log("endgame");
        this.player.setDead(1);
        this.player.div.classList.add("crashed");
        document.getElementById("plateau").classList.add("animationpaused");
        document.getElementById("sky").classList.add("animationpaused");
    };
    return Game;
}());
window.addEventListener("load", function () {
    Game.getInstance();
});
var Crashing = (function () {
    function Crashing(p) {
        this.player = p;
    }
    Crashing.prototype.draw = function () {
        var g = Game.getInstance();
        g.endGame();
    };
    Crashing.prototype.onkeydown = function () {
    };
    return Crashing;
}());
var Jumping = (function () {
    function Jumping(p) {
        this.player = p;
        this.jumpDirection = -4;
    }
    Jumping.prototype.draw = function () {
        this.player.x += this.player.speed;
        this.player.y += this.jumpDirection;
        if (this.player.y < 50)
            this.jumpDirection = 4;
        if (this.player.y > 140) {
            this.player.behaviour = new Running(this.player);
        }
    };
    Jumping.prototype.onkeydown = function () {
    };
    return Jumping;
}());
var Running = (function () {
    function Running(p) {
        this.player = p;
    }
    Running.prototype.draw = function () {
        this.player.x += this.player.speed;
    };
    Running.prototype.onkeydown = function () {
        this.player.behaviour = new Jumping(this.player);
    };
    return Running;
}());
//# sourceMappingURL=main.js.map