
const http = require('http')
const express = require('express')

const config = require('./src/config')
const App = require('./src/app')

const app = new App({
  config,
  router: express()
})
const server = http.createServer(app.getRouter());

server.listen(config.port, (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log(`Magic on ${config.port}`)
  }
})

