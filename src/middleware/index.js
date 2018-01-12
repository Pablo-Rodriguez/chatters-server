
const {join} = require('path')

const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const morgan = require('morgan')

const session = require('../lib/session')
const Middleware = require('../base/middleware')
const Response = require('../base/response')
const errors = require('./errors')

module.exports = class extends Middleware {
  firstmiddleware () {
    this.router.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
      res.header('Access-Control-Allow-Credentials', 'true')
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
      next()
    })
  }

  premiddleware () {
    this.router.use(bodyParser.urlencoded({extended: false}))
    this.router.use(bodyParser.json())
    this.router.use(cookieParser())
    this.router.use(session)
    this.router.use(passport.initialize())
    this.router.use(passport.session())
    super.use('morgan', morgan(this.config.morgan.level))
    const staticDir = express.static(join(__dirname, '..', 'public'))
    this.router.use(staticDir)
    this.router.use('/login', staticDir)
    this.router.use('/signup', staticDir)
  }

  postmiddleware () {}

  lastmiddleware () {
    this.router.use(errors(Response))
  }
}
