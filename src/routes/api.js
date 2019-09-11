const jwt = require('jsonwebtoken')
const User = require('../models/user');
const express = require('express')
const router = express.Router()
const {wrap} = require('./../util/wrap')



router.route('/')
  .get(wrap(async (req, res) => {
    res.send({'message' : 'this is a message'})
  }))


router.route('/login')
  .post(wrap(async (req, res) => {
    let userData = req.body
    const user = await User.findOne({email:userData.email}) 
    if ( user.password !== userData.password ||  !user ) throw new Error('User and/or password incorrect')
    let payload = { subject: user._id }
    let token = jwt.sign(payload,'secretKey')            
    res.status(200).send({token})
  }))

module.exports = router