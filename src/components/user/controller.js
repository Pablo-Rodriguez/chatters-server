
const Controller = require('../../base/controller')
const Passport = require('../../lib/passport')

const UNIQUE_ERROR = 11000

module.exports = ({Model, Response}) => class UserController extends Controller {
  static async signup (req, res) {
    try {
      await Model.validate(req.body)
      await Model.create(req.body)
      Response.sendOK(res)
    } catch (error) {
      if (Array.isArray(error)) {
        Response.sendError(res, {
          code: 400,
          data: {
            message: Response.BAD_REQUEST.data.message,
            fields: error
          }
        })
      } else if (error.code === UNIQUE_ERROR) {
        Response.sendError(res, Response.BAD_REQUEST)
      } else {
        throw error
      }
    }
  }

  static async login (req, res, next) {
    try {
      const user = await Passport.authenticate(req, res, next, 'local')
      await Passport.login(req, user)
      Response.sendOK(res)
    } catch (error) {
      Response.sendError(res, Response.BAD_REQUEST)
    }
  }

  static session (req, res) {
    Response.sendData(res, req.user)
  }

  static logout (req, res) {
    req.logout()
    Response.sendOK(res)
  }
}

