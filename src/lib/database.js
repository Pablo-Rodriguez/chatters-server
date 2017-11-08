
const mongoose = require('mongoose')

module.exports = class {
  static async connect (url) {
    mongoose.Promise = global.Promise
    try {
      await mongoose.connect(url, {useMongoClient: true})
      console.log('Success DB connection')
    } catch (error) {
      console.log('Error connecting to DB:')
      console.log(err)
    }
  }
}
