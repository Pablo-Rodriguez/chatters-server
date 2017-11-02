
const morgan = require('morgan')
const bodyParser = require('body-parser')

const Middlewares = require('../base/middleware')

module.exports = class extends Middlewares {
  firstmiddleware () {}

  premiddleware () {
    this.router.use(bodyParser.urlencoded({extended: false}))
    this.router.use(bodyParser.json())
    super.use('morgan', morgan(this.config.morgan.level))
  }

  postmiddleware () {}

  lastmiddleware () {}
}

