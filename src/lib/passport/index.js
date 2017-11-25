
const passport = require('passport')

const LocalStrategy = require('./local')
const UserSchema = require('../../components/user/schema')
const UserModel = require('../../components/user/model')({Schema: UserSchema})
const Bcrypt = require('../bcrypt')

module.exports = class Passport {
  static configure () {
    console.log('Configuring passport')
    passport.serializeUser(Passport.serialize)
    passport.deserializeUser(Passport.deserialize)
    
    passport.use(LocalStrategy.use(UserModel, Bcrypt))
  }

  static serialize (account, cb) {
    return cb(null, account._id)
  }

  static async deserialize (id, cb) {
    const account = await UserModel.getById(id)
    return cb(null, account)
  }

  static async authenticate (req, res, next, type) {
    return new Promise((resolve, reject) => {
      passport.authenticate(type, (err, user, info) => {
        if (err) {
          reject(err)
        } else if (!user) {
          reject(new Error(info.message))
        } else {
          resolve(user)
        }
      })(req, res, next)
    })
  }

  static async login (req, account) {
    return new Promise((resolve, reject) => {
      req.login(account, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }
}
