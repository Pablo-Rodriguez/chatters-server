
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const User = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  dir: {
    type: String,
    default: null
  }
})

module.exports = mongoose.model('User', User)

