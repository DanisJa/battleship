const Ship = (length) => {
     let hitWhere = []
     
     hitWhere.length = length
     for(let i = 0; i < length; i++){
          hitWhere[i] = false
     }

     function hit(num){
          console.log('Hitting the ship on ' + num)
          hitWhere[num] = true
          console.log('Hit here: ' + num + hitWhere[num])
     }

     function isSunk(){
          return length === hitWhere.length
     }

     return{
          length: length,
          hitWhere: hitWhere,
          sunk: false,
          hit,
          isSunk
     }
}

module.exports = Ship
