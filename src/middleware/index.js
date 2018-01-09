
const {join} = require('path')
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
      res.header('Access-Control-Allow-Origin', 'http://192.168.1.130:3000')
      //res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
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
    this.router.use((req, res, next) => {
      if (Object.keys(req.query).length > 0) {
        console.log('Query', req.query)
      }
      if (Object.keys(req.body).length > 0) {
        console.log('Body', req.body)
      }
      next()
    })
    super.use('morgan', morgan(this.config.morgan.level))
  }

  postmiddleware () {}

  lastmiddleware () {
    this.router.use(errors(Response))
  }
}
