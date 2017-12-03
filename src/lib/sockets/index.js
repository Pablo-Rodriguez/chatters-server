
const socketIO = require('socket.io')
const cookieParser = require('cookie-parser')

const session = require('../session')
const Passport = require('../passport')
const Connection = require('./connection')

module.exports = class Sockets {
  static createServer (server) {
    const io = socketIO(server)

    io.use(Sockets.sessionCookie)
    io.use(Sockets.auth)

    io.on('connection', Connection.use(io))
  }

  static sessionCookie (socket, next) {
    let req = socket.handshake
    let res = {}
    cookieParser()(req, res, (err) => {
      if (err) {
        return next(err)
      } else {
        session(req, res, next)
      }
    })
  }

  static auth (socket, next) {
    const passport = socket.handshake.session.passport
    if (passport != null && typeof passport.user === 'string') {
      Passport.deserialize(passport.user, (err, user) => {
        if (err) {
          next(err)
        } else {
          socket.user = user
          next(null)
        }
      })
    } else {
      socket.disconnect()
    }
  }
}

