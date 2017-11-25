
const messages = require('./messages')

module.exports = class Response {
  static sendData (res, data = {}) {
    res.json({
      error: false,
      data
    })
  }

  static sendOK (res) {
    Response.sendData(res)
  }

  static sendError (res, error) {
    res.status(error.code).json({
      error: true,
      data: error.data
    })
  }

  static get NOT_FOUND () {
    return {
      code: 404,
      data: {
        message: messages.NOT_FOUND
      }
    }
  }

  static get SERVER_ERROR () {
    return {
      code: 500,
      data: {
        message: messages.SERVER_ERROR
      }
    }
  }

  static get FORBIDDEN () {
    return {
      code: 403,
      data: {
        message: messages.FORBIDDEN
      }
    }
  }

  static get BAD_REQUEST () {
    return {
      code: 400,
      data: {
        message: messages.BAD_REQUEST
      }
    }
  }
}
