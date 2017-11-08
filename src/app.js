
const mix = require('mixin-es6')

const Router = require('./base/router')
const Middleware = require('./middleware')
const Passport = require('./lib/passport')
const UserRouter = require('./components/user/router')

module.exports = class App extends mix(Router, Middleware) {
  configure () {
    Passport.configure()
  }

  routes () {
    this.mount(UserRouter)
  }
}
