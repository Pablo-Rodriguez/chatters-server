
const expressSession = require('express-session')

const config = require('../config')

module.exports = expressSession(config.expressSession)

