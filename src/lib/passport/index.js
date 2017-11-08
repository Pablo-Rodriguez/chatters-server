
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
}
