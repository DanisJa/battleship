import Ship from './Ship.js'

const board = () => {
     let body = []
     let showShips = false

     for(let i = 0; i < 100; i++){ //initializing the board array
          body.push({isShot: false, hasShip: false})
     }
     
     function getRandNum(num){ //random number generator
          return Math.floor(Math.random() * num)
     }

     function recieveAttack(num){ //recieves attack on index
          body[num].isShot = true
     }

     function placeShip(startIndex, ship){ //places a ship in the array
          const shipLocation = []
          let index = startIndex

          if(ship.isHorizontal === false){
               for(let i = 0; i < ship.body.length; i++){
                    shipLocation.push(index)
                    body[index].hasShip = true
                    index += 10
               }
          }
          else{
               for(let i = 0; i < ship.body.length; i++){
                    shipLocation.push(index)
                    body[index].hasShip = true
                    index++
               }
          }

          return shipLocation
     }

     function hasShip(index){ //checks if ship was placed at a certain index
          return body[index].hasShip
     }

     function allShipsSunk(){ //checks if all ships are sunk
          let isSunk = true
          body.forEach((cell) => {
               if(cell.hasShip && !(cell.isShot)){
                    isSunk = false
               }
          })
          return isSunk
     }

     function areAllShipsSunk(){ //same as allShipsSunk() but checks if ships were placed at all first
          let foundShips = false
          body.forEach((element) => {
               if(element.hasShip === true){
                    foundShips = true
               }
          })

          if(allShipsSunk() && foundShips){
               return true
          }else{
               return false
          }
     }

     function isPlaceable(startIndex, ship){
          let index = startIndex
          if(ship.isHorizontal() === false){
               if((index + ship.body.length * 10) > 99 && ship.body.length > 1){
                    return false
               }
               for(let i = 0; i < ship.body.length; i++){
                    if(body[index].hasShip === true){
                         return false
                    }
                    index += 10
               }
          }
          else{
               let temp = true
               if((startIndex + ship.body.length) > 99 && ship.body.length > 1){
                    return false
               }

               for(let i = 0; i < ship.body.length; i++){
                    if(temp === false){ // checks if it is first iteration
                         switch(index){
                              case 10:
                                   return false
                              case 20:
                                   return false
                              case 30:
                                   return false
                              case 40:
                                   return false
                              case 50:
                                   return false
                              case 60:
                                   return false
                              case 70:
                                   return false
                              case 80:
                                   return false
                              case 90:
                                   return false
                              default: break
                         }
                    }
                    temp = false //first iteration done
                    if(body[index].hasShip === true){
                         return false
                    } 
                    index++
               }
          }
          return true
     }

     function placeShipsRandomly(){
          body.forEach((element) => {
               element.hasShip = false
               element.isShot = false
          })

          const ships = {
               carrier: Ship(5),
               battleship: Ship(4),
               destroyer1: Ship(3),
               destroyer2: Ship(3),
               submarine1: Ship(2)
          }

          const shipKeys = Object.keys(ships)

          shipKeys.forEach((shipName) => {
               if(getRandNum(2)){
                    ships[shipName].setHorizontal()
               }
               let startIndex = getRandNum(100)
               while(!(isPlaceable(startIndex, ships[shipName]))){
                    startIndex = getRandNum(100)
               }
               placeShip(startIndex, ships[shipName])
          })
     }

     const ships = {
          carrier: Ship(5),
          battleship: Ship(4),
          destroyer1: Ship(3),
          destroyer2: Ship(3),
          submarine1: Ship(2)
     }

     let shipKeys = Object.keys(ships)

     function getNextShip(){
          return ships[shipKeys[0]]
     }

     function removeShip(){
          shipKeys.splice(0, 1)
     }

     function resetBoard() {
          body.forEach((element) => {
               element.hasShip = false
               element.isShot = false
          })
          shipKeys = Object.keys(ships)
     }

     return {
          body, 
          recieveAttack,
          placeShip,
          hasShip,
          allShipsSunk,
          areAllShipsSunk,
          isPlaceable, 
          placeShipsRandomly, 
          removeShip, 
          resetBoard, 
          getNextShip,
          showShips
     }
}

export default board