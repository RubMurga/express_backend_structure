require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const mongoose = require('mongoose')
const { wrap } = require('./src/util/wrap')
const { errorHandler } = require('./src/util/errorHandler')
const { verifyToken } = require('./src/util/token')
const app = express()
const DBOPTIONS = { keepAlive: 1, connectTimeoutMS: 30000, useNewUrlParser: true }
const PORT = process.env.PORT || 3000
const db = "mongodburl" // here goes the database connection string
const cors = require('cors')
const api = require('./src/routes/api')
const protected_test = require('./src/routes/protected')

async function run () {
  // Middlewares
  app.use(bodyParser.text())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(compression())
  app.use(cors())
  // Allowed Headers
  app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization')
    next()
  })
  // routes
  app.use('/api',api)
  app.use('/protected', verifyToken, protected_test)
  app.use(errorHandler)
  // Mongoose bootstrapping
  mongoose.Promise = global.Promise
  // UNCOMENT THIS TO CREATE THE DATABASE CONNECTION
  
  //mongoose.connect(db, DBOPTIONS)
  //const database = mongoose.connection
  //database.on('error', wrap(console.error.bind(console, 'DB connection error: ')))
  //database.once('open', () => {
  //    console.log('Connection with mongoose created')
  //})

  app.listen(PORT)
  console.log(`Listening on port: ${PORT}`)
  
}
run().catch(error => console.error(error.stack))

module.exports = app
