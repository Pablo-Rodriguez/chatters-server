
const Strategy = require('passport-local')
const Bcrypt = require('../bcrypt')

module.exports = class LocalStrategy {
  static get fields () {
    return {
      usernameField: 'name',
      passwordField: 'password'
    }
  }

  static use (Model) {
    console.log('Local Strategy added to passport')
    return new Strategy(LocalStrategy.fields, LocalStrategy.strategy(Model, Bcrypt))
  }

  static strategy (Model, Bcrypt) {
    return async (name, password, done) => {
      try {
        let user = await Model.getByName(name)
        if (user != null) {
          let validPassword = await Bcrypt.compare(password, user.password)
          if (validPassword) {
            return done(null, user)
          }
        }
        throw new Error('Wrong Account')
      } catch (err) {
        done(null, false, err)
      }
    }
  }
}
