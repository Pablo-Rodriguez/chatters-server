
const mix = require('mixin-es6')

const Router = require('./base/router')
const Middleware = require('./middleware')

module.exports = class App extends mix(Router, Middleware) {
  configure () {}

  routes () {}
}
