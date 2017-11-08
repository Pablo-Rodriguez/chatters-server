
const Controller = require('../../base/controller')

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
          data: error
        })
      } else if (error.code === UNIQUE_ERROR) {
        Response.sendError(res, Response.BAD_REQUEST)
      } else {
        throw error
      }
    }
  }

  static login (req, res) {
    if (req.isAuthenticated()) {
      Response.sendOK(res)
    } else {
      Response.sendError(res, Response.BAD_REQUEST)
    }
  }

  static logout (req, res) {
    req.logout()
    Response.sendOK(res)
  }
}

