const Ship = (length) => {
     const body = []
     const location = []
     let horizontal = false

     body.length = length
     for(let i = 0; i < length; i++){
          body[i] = false
     }
     
     function setHorizontal(){
          horizontal = true
     }

     function setVertical(){
          horizontal = false
     }

     function isHorizontal(){
          return horizontal
     }

     function hit(num){
          body[num] = true
     }

     function isSunk(){
          return !(body.includes(false))
     }

     function getLocation() {
          return location
     }

     function setLocation(locationArray) {
          locationArray.map((index) => location.push(index))
     }

     return{
          length: length,
          body: body,
          hit,
          isSunk,
          setVertical,
          setHorizontal,
          isHorizontal,
          getLocation,
          setLocation
     }
}

export default Ship
