class Nim {
  piles: Array<number>;
  constructor(size: number, maxSize: number = 100) {
    //this.piles = new Array<number>(size);
    this.RandomPiles(size, maxSize);
  }

  IsSafe() : boolean {
    let x:number = 0;
    for(let i:number = 0;i<this.piles.length;i++) {
      x ^= this.piles[i];
    }

    return x == 0;
  }

  MakeSafe() {
    let x:number = 0;
    for(let i:number = 0;i<this.piles.length;i++) {
      x ^= this.piles[i];
    }

    for(let i:number = 0;i<this.piles.length;i++) {
      x ^= this.piles[i];
      if(this.piles[i] > x) {
        this.piles[i] -= (this.piles[i] - x);
        return;
      }
      x ^= this.piles[i];
    }
  }

  RandomPiles(pileCount: number, maxSize: number) {
    this.piles = new Array<number>(pileCount);
    
    for(let i=0;i<maxSize;i++) {
      this.piles[i] = randomRange(1, maxSize);
    }
  }

  GetSize() : number {
    return this.piles.length;
  }

  GetPileSize(pile: number) : number {
    return this.piles[pile];
  }

  Remove(pile: number, amount: number) : void {
    if(this.piles[pile] >= amount) {
      this.piles[pile] -= amount;
    }
    
    return;
  }

  Log() {
    console.log(this.piles);
    this.IsSafe() ? console.log("The game is safely determined") : console.log("The game is not safely determined");
  }
}

class PlayerAI {
  game: Nim;

  constructor(game: Nim) {
    this.game = game;
  }

  Play() {
    if(this.game.IsSafe()) {
      for(let pile:number = 0;pile < this.game.GetSize(); pile++) {
        let amount:number = randomRange(1, this.game.GetPileSize(pile));
        if(this.game.GetPileSize(pile) >= amount) {
          
          this.game.Remove(pile, amount);
        }        
      }
      
    }
    else {
      this.game.MakeSafe();
    }
  }
}

class Player {
  game: Nim;

  constructor(game: Nim) {
    this.game = game;
  }

  Play() {

  }
}

function randomRange(min: number, max: number) : number {
  return ~~(Math.random() * (max - min + 1)) + min
}

let nim : Nim = new Nim(3);