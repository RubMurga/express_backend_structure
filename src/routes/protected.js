const express = require('express')
const router = express.Router()
const { wrap } = require('./../util/wrap')

router.route('/special')
  .get(wrap(async (req, res, next) => {
    let response = {'message' : 'this is a protected message'}
    res.json(response)
  }))


module.exports = router
