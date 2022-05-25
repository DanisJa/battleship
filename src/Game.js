class GameBoard {
     constructor() {
          this.gameBoardArray = this.createGameBoard()
          this.missedAttacks = []
     }

     createGameBoard(){
          return 2
     }
}

module.exports = GameBoard