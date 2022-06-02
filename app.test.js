const GameBoard = require('./Game')
const Ship = require('./Ship')

test('ship-hit-test', () => {
     s1 = Ship(2)
     s1.hit(0)

     expect(s1.hitWhere).toStrictEqual([true, false])
})

test('game-board-test', () => {
     gb = new GameBoard()
     
     expect(gb.createGameBoard().toStrictEqual(2))
})

