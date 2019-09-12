const jwt = require('jsonwebtoken')

module.exports = {
  verifyToken : (req,res,next) => {
    console.log('hola desde token')
    if (!req.headers.authorization){
      // The header key is not contained in the headers
      throw new Error('Unauthorized request')
    }
    
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null'){
      // The token is in the heanders but is equal to null
      throw new Error('Unauthorized request')
    }
  
    let payload = jwt.verify(token, 'secretKey')

    if (!payload){
      // the token is not correct
      throw new Error('Unauthorized request')
    }
    req.userId = payload.subject
    next()
  }
}