var Nim = /** @class */ (function () {
    function Nim(size, maxSize) {
        if (maxSize === void 0) { maxSize = 100; }
        //this.piles = new Array<number>(size);
        this.RandomPiles(size, maxSize);
    }
    Nim.prototype.IsSafe = function () {
        var x = 0;
        for (var i = 0; i < this.piles.length; i++) {
            x ^= this.piles[i];
        }
        return x == 0;
    };
    Nim.prototype.MakeSafe = function () {
        var x = 0;
        for (var i = 0; i < this.piles.length; i++) {
            x ^= this.piles[i];
        }
        for (var i = 0; i < this.piles.length; i++) {
            x ^= this.piles[i];
            if (this.piles[i] > x) {
                this.piles[i] -= (this.piles[i] - x);
                return;
            }
            x ^= this.piles[i];
        }
    };
    Nim.prototype.RandomPiles = function (pileCount, maxSize) {
        this.piles = new Array(pileCount);
        for (var i = 0; i < maxSize; i++) {
            this.piles[i] = randomRange(1, maxSize);
        }
    };
    Nim.prototype.GetSize = function () {
        return this.piles.length;
    };
    Nim.prototype.GetPileSize = function (pile) {
        return this.piles[pile];
    };
    Nim.prototype.Remove = function (pile, amount) {
        if (this.piles[pile] >= amount) {
            this.piles[pile] -= amount;
        }
        return;
    };
    Nim.prototype.Log = function () {
        console.log(this.piles);
        this.IsSafe() ? console.log("The game is safely determined") : console.log("The game is not safely determined");
    };
    return Nim;
}());
var PlayerAI = /** @class */ (function () {
    function PlayerAI(game) {
        this.game = game;
    }
    PlayerAI.prototype.Play = function () {
        if (this.game.IsSafe()) {
            for (var pile = 0; pile < this.game.GetSize(); pile++) {
                var amount = randomRange(1, this.game.GetPileSize(pile));
                if (this.game.GetPileSize(pile) >= amount) {
                    this.game.Remove(pile, amount);
                }
            }
        }
        else {
            this.game.MakeSafe();
        }
    };
    return PlayerAI;
}());
var Player = /** @class */ (function () {
    function Player(game) {
        this.game = game;
    }
    Player.prototype.Play = function () {
    };
    return Player;
}());
function randomRange(min, max) {
    return ~~(Math.random() * (max - min + 1)) + min;
}
var nim = new Nim(3);
//# sourceMappingURL=nim.js.map