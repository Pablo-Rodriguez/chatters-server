
const users = {}

module.exports = class Connection {
  static use (io) {
    return (socket) => {
      users[socket.user.name] = socket.id
      socket.on('chat::init-call', (name) => {
        console.log(`Iniciando llamada de ${socket.user.name} a ${name}`)
        if (users[name] != null) {
          io.sockets.sockets[users[name]].emit('chat::incoming-call', {from: socket.user.name})
        } else {
          socket.emit('chat::rejected-call', {
            msg: `${name} no está conectado en este momento`
          })
        }
      })

      socket.on('chat::accepted-call', (name) => {
        console.log(`${socket.user.name} ha aceptado la llamada de ${name}`)
        io.sockets.sockets[users[name]].emit('chat::accepted-call', {from: socket.user.name})
      })

      socket.on('chat::rejected-call', (name) => {
        console.log(`${socket.user.name} ha rechazado la llamada de ${name}`)
        io.sockets.sockets[users[name]].emit('chat::rejected-call', {
          msg: `${socket.user.name} no está disponible en este momento`
        })
      })
      
      socket.on('chat::send-message', ({to, by, message}) => {
        if (users[to] != null) {
          console.log(`Message from ${by} to ${to}: ${message}`)
          io.sockets.sockets[users[to]].emit('chat::message', {by, message})
        }
      })

      socket.on('disconnect', () => {
        delete users[socket.user.name]
      })
    }
  }
}

