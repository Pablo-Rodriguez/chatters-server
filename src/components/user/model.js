
const indicative = require('indicative')

const bcrypt = require('../../lib/bcrypt')
const Model = require('../../base/model')

module.exports = ({Schema}) => class UserModel extends Model {
  static get validation () {
    return {
      name: 'required|string|min:1|max:32|regex:[A-Za-z_]+',
      password: 'required|string|min:8|max:256'
    }
  }

  static getById (id) {
    return Schema.findById(id)
  }

  static getByName (name) {
    return Schema.findOne({name})
  }
  
  static validateQuery (query) {
    return indicative.validate({name: query}, {name: UserModel.validation.name})
  }

  static searchByName (query) {
    return Schema.find({'name': { $regex: new RegExp(`^${query}`) }}).select('name')
  }

  static validate ({name, password}) {
    return indicative.validate({name, password}, UserModel.validation)
  }

  static async create ({name, password}) {
    password = await bcrypt.hash(password)
    return new Schema({name, password}).save()
  }
}

