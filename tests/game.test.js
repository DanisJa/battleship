import Game from '../src/Game'
import Ship from '../src/Ship'

it('board length should be === 100', () => {
	const board = Game()
	expect(board.body.length).toBe(100)
})

it('cell should be shot', () => {
	const board = Game()
	board.recieveAttack(4)
	expect(board.body[4].isShot).toBe(true)
})

it('should return array of the ship location (horizontal)', () => {
	const board = Game()
	const ship = Ship(3)
	ship.setHorizontal()
	expect(board.placeShip(2, ship)).toEqual([2, 3, 4])
})

it('should return array of the ship location(vertical)', () => {
	const board = Game()
	const ship = Ship(3)
	expect(board.placeShip(2, ship)).toEqual([2, 12, 22])
})

it('cell should have ship', () => {
	const board = Game()
	const ship = Ship(3)
	const shipArray = board.placeShip(2, ship)
	expect(board.body[shipArray[0]].hasShip).toBe(true)
})

it('cell shot should return true if it has a ship', () => {
	const board = Game()
	const ship = Ship(3)
	const shipArray = board.placeShip(2, ship)
	expect(board.hasShip(shipArray[0])).toBe(true)
})

it('should return true if all ships sunk', () => {
	const board = Game()
	const ship = Ship(3)
	const shipArray = board.placeShip(2, ship)
	shipArray.map((shipLocation) => board.recieveAttack(shipLocation))
	expect(board.allShipsSunk()).toBe(true)
})

it('should return false if all ships not sunk', () => {
	const board = Game()
	const ship = Ship(3)
	board.placeShip(3, ship)
	board.recieveAttack(3)
	board.recieveAttack(13)
	// board.recieveAttack(23)
	expect(board.allShipsSunk()).toBe(false)
})

it('showShip should return true', () => {
	const board = Game()
	board.showShips = true
	expect(board.showShips).toBe(true)
})

it('areAllShipsSunk should return false if no ships were placed', () => {
	const board = Game()
	expect(board.areAllShipsSunk()).toBe(false)
})

it('areAllShipsSunk should return true if ships were placed and they were shot', () => {
	const board = Game()
	const ship = Ship(3)
	ship.setHorizontal()
	board.placeShip(2, ship)
	board.recieveAttack(2)
	board.recieveAttack(3)
	board.recieveAttack(4)
	
	expect(board.areAllShipsSunk()).toBe(true)
})

it('areAllShipsSunk should return false if ships were placed and not shot', () => {
	const board = Game()
	const ship = Ship(3)
	ship.setHorizontal()
	board.placeShip(2, ship)
	board.recieveAttack(2)
	board.recieveAttack(3)

	expect(board.areAllShipsSunk()).toBe(false)
})

it('should return false if ship placement is invalid', () => {
	const board = Game()
	const ship = Ship(3)
	ship.setHorizontal()
	
	expect(board.isPlaceable(99, ship)).toBe(false)
})

it('should return true if ship placement is valid', () => {
	const board = Game()
	const ship = Ship(3)
	// board.placeShip(55, Ship(3))
	expect(board.isPlaceable(65, ship)).toBe(true)
})