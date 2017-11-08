
const http = require('http')
const express = require('express')

const config = require('./src/config')
const App = require('./src/app')
const Database = require('./src/lib/database')

const app = new App({
  config,
  router: express()
})
const server = http.createServer(app.getRouter());

Database.connect(config.db.url)

server.listen(config.port, (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log(`Magic on ${config.port}`)
  }
})

