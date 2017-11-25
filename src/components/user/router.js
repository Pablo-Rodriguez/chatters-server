
const passport = require('passport')

const Router = require('../../base/router')
const Response = require('../../base/response')
const Schema = require('./schema')
const Model = require('./model')({Schema})
const Controller = require('./controller')({Model, Response})
const auth = require('../../middleware/auth')

module.exports = class UserRouter extends Router {
  static get mountPoint () {
    return '/api'
  }

  routes () {
    this.router.post('/signup', Router.wrap(Controller.signup))
    this.router.post('/login', Router.wrap(Controller.login))
    this.router.get('/session', auth(), Controller.session)
    this.router.post('/logout', auth(), Controller.logout)
  }
}

