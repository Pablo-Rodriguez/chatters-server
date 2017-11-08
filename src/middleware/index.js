
const {join} = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const passport = require('passport')
const morgan = require('morgan')

const Middleware = require('../base/middleware')
const Response = require('../base/response')
const errors = require('./errors')

module.exports = class extends Middleware {
  firstmiddleware () {}

  premiddleware () {
    this.router.use(bodyParser.urlencoded({extended: false}))
    this.router.use(bodyParser.json())
    this.router.use(cookieParser())
    this.router.use(expressSession(this.config.expressSession))
    this.router.use(passport.initialize())
    this.router.use(passport.session())
    super.use('morgan', morgan(this.config.morgan.level))
  }

  postmiddleware () {}

  lastmiddleware () {
    this.router.use(errors(Response))
  }
}
