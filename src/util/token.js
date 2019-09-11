const jwt = require('jsonwebtoken')

module.exports = {
  verifyToken : (req,res,next) => {
    console.log('hola desde token')
    if (!req.headers.authorization){
      console.log('1 No Has sido autorizado por la funcion verify token en server -> api.js')
      throw new Error('Unauthorized request')
    }
    
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null'){
      console.log('2 No Has sido autorizado por la funcion verify token en server -> api.js')
      throw new Error('Unauthorized request')
    }
  
    let payload = jwt.verify(token, 'secretKey')

    if (!payload){
      console.log('3 No Has sido autorizado por la funcion verify token en server -> api.js')
      throw new Error('Unauthorized request')
    }
  
    console.log('Has sido autorizado por la funcion verify token en server -> api.js')
    req.userId = payload.subject
    next()
  }
}