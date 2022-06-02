import board from "./Game.js"
import Board from "./Game.js"

const computerBoardFE = document.querySelector('.computer-board')
const userBoardFE = document.querySelector('.user-board')
const placeBoardFE = document.querySelector('.place-board .board')
const placeBoardFEParent = document.querySelector('.place-board')
const winnerText = document.querySelector('#winner-text')
const rotationButton = document.querySelector('.place-board #rotation')

let computerBoard = Board()
let userBoard = Board()

let movesPlayed = [] //used for tracking already played computer moves

function getRandNum(num){ //random number generator
	return Math.floor(Math.random() * num)
}

function placeShips() {
	let ship = userBoard.getNextShip()
	let horizontal = true
	let totalShips = 0

	for(let i = 0; i < 100; i++){
		const cell = document.createElement('div')
		cell.className = 'cell'
		cell.id = 'place' + i
	
		function isPlaceable(id){
			for(let i = 0; i < 5; i++){
				if(document.getElementById(id + i) === 'ship-placed'){
					return false
				}
			}
			return true
		}

		function mouseOutFunction() {
			if(isPlaceable(i)){
				document.getElementById(`place${i}`).style.backgroundColor = 'white'
				for(let j = 0; j < ship.length; j++){
					if(horizontal){
						document.getElementById(`place${i + j}`).style.backgroundColor = 'white'
					}
					else{
						document.getElementById(`place${i + j * 10}`).style.backgroundColor = 'white'
					}
				}
			}
		}

		function mouseOverFunction() {
			if(isPlaceable(i)){
				document.getElementById(`place${i}`).style.backgroundColor = 'grey'
				for(let j = 0; j < ship.length; j++){
					if(horizontal){
						document.getElementById(`place${i + j}`).style.backgroundColor = 'grey'
					}
					else{
						document.getElementById(`place${i + j * 10}`).style.backgroundColor = 'grey'
					}
				}
			}
		}

		function clickFunction(e){
			ship = userBoard.getNextShip()
			document.getElementById(`place${i}`).style.backgroundColor = 'lightgreen'
			for(let j = 0; j < ship.length; j++){
				if(horizontal){
					document.getElementById(`place${i + j}`).style.backgroundColor = 'lightgreen'
					document.getElementById(`place${i + j}`).removeEventListener('mouseover', mouseOverFunction, true)
					document.getElementById(`place${i + j}`).removeEventListener('mouseout', mouseOutFunction, true)
					document.getElementById(`place${i + j}`).id = 'ship-placed' + i
				}
				else{
					document.getElementById(`place${i + j * 10}`).style.backgroundColor = 'lightgreen'
					document.getElementById(`place${i + j * 10}`).removeEventListener('mouseover', mouseOverFunction, true)
					document.getElementById(`place${i + j * 10}`).removeEventListener('mouseout', mouseOutFunction, true)
					document.getElementById(`place${i + j * 10}`).id ='ship-placed' + i
				}
			}
			userBoard.placeShip((e.target.id).substring(11), ship)
			userBoard.removeShip()
			totalShips++
			if(!(totalShips < 5)){
				placeBoardFE.style.display = 'none'
				placeBoardFEParent.style.display = 'none'
				game(userBoard)
			}
		}

		cell.addEventListener('mouseover', mouseOverFunction, true)
		cell.addEventListener('mouseout', mouseOutFunction, true)

		cell.addEventListener('click', clickFunction)

		placeBoardFE.appendChild(cell)
	}
	
	rotationButton.style.backgroundColor = 'lightgreen'

	rotationButton.addEventListener('click', () => { // rotation button changing 'rotation' value
		if(horizontal){
			rotationButton.style.backgroundColor = 'red'
			horizontal = false
		}else{
			rotationButton.style.backgroundColor = 'lightgreen'
			horizontal = true
		}
	})
}

function setupComputerBoard(){
	for(let i = 0; i < 100; i++){
		const cell = document.createElement('div')
		cell.className = 'cell'
		cell.id = i


		function setCellWhite(){
			cell.style.backgroundColor = 'white'
		}
		
		function setCellGrey(){
			cell.style.backgroundColor = 'grey'
		}

		function clickFunction(){
			computerBoard.recieveAttack(i)

			if(computerBoard.hasShip(i)){
				cell.style.backgroundColor = 'red'
			}
			else{
				cell.style.backgroundColor = 'blue'
			}

			cell.removeEventListener('mouseover', setCellGrey, true)
			cell.removeEventListener('mouseout', setCellWhite, true)

			move()
			cell.removeEventListener('click', clickFunction)
		}


		cell.addEventListener('mouseover', setCellGrey, true)
		cell.addEventListener('mouseout', setCellWhite, true)

		cell.addEventListener('click', clickFunction)

		computerBoardFE.appendChild(cell)
	}
	
	computerBoard.placeShipsRandomly()
	userBoardFE.style.border = '1px solid black'
}


function setupUserBoard(userBoard){
	for(let i = 0; i < 100; i++){
		const cell = document.createElement('div')
		cell.className = 'cell'
		cell.id = 'userCell' + i

		if(userBoard.body[i].hasShip){
			cell.style.backgroundColor = 'lightgreen'
		}

		userBoardFE.appendChild(cell)
	}
	userBoardFE.style.border = '1px solid black'
}

function checkIfMovePlayed(num){
	return movesPlayed.includes(num)
}

function move(){
	console.log('calling move function')
	let attackedCell = getRandNum(100)

	while(checkIfMovePlayed(attackedCell)){
		attackedCell = getRandNum(100)
	}

	userBoard.recieveAttack(attackedCell)
	movesPlayed.push(attackedCell)
	console.log(movesPlayed.length)

	if(userBoard.body[attackedCell].hasShip){
		userBoardFE.children.item(attackedCell).style.backgroundColor = 'red'
	}else{
		userBoardFE.children.item(attackedCell).style.backgroundColor = 'yellow'
	}

	checkWinner()
}

function checkWinner(){
	if(userBoard.allShipsSunk()){
		winnerText.textContent = 'computer wins'
	}else if(computerBoard.allShipsSunk()){
		winnerText.textContent = 'user wins'
	}
}

function game(userBoard){
	setupUserBoard(userBoard)
	setupComputerBoard()
}

window.onload = placeShips()

