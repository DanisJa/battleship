// import { it } from "jest-circus";
const Ship = require('../src/Ship')

it('ship with 4 length should have 4 length', () => {
     const testShip = Ship(4)
	 expect(testShip.length).toBe(4)
})

it('should be hit', () => {
	const testShip = Ship(4)
	testShip.hit(3)
	expect(testShip.body[3]).toBe(true)
})

it('should be sunk', () => {
	const testShip = Ship(2)
	testShip.hit(0)
	testShip.hit(1)
	expect(testShip.isSunk()).toBe(true)
})

it('should not be sunk', () => {
	const testShip = Ship(3)
	testShip.hit(1)
	expect(testShip.isSunk()).toBe(false)
})

it('should be horizontal', () => {
	const testShip = Ship(3)
	testShip.setHorizontal()

	expect(testShip.isHorizontal()).toBe(true)
})

it('should be vertical', () => {
	const testShip = Ship(3)
	testShip.setVertical()

	expect(testShip.isHorizontal()).toBe(false)
})

it('should have location [1, 2]', () => {
	const testShip = Ship(3)
	testShip.setLocation([1, 3])
	expect(testShip.getLocation()).toEqual([1, 3])
})