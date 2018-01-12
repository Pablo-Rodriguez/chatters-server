
const users = {}

module.exports = class Connection {
  static use (io) {
    return (socket) => {
      users[socket.user.name] = socket.id
      socket.on('chat::init-call', ({name, signalInfo, constraints}) => {
        try {
          if (users[name] != null) {
            io.sockets.sockets[users[name]].emit('chat::incoming-call', {from: socket.user.name, signalInfo, constraints})
          } else {
            socket.emit('chat::rejected-call', {
              msg: `${name} no está conectado en este momento`
            })
          }
        } catch (e) {console.log(e)}
      })

      socket.on('chat::accepted-call', ({from, signalInfo, constraints}) => {
        try {
          io.sockets.sockets[users[from]].emit('chat::accepted-call', {from: socket.user.name, signalInfo, constraints})
        } catch (e) {console.log(e)}
      })

      socket.on('chat::rejected-call', (name) => {
        try {
          io.sockets.sockets[users[name]].emit('chat::rejected-call', {
            msg: `${socket.user.name} no está disponible en este momento`
          })
        } catch (e) {console.log(e)}
      })
      
      socket.on('chat::send-message', ({to, by, message}) => {
        try {
          if (users[to] != null) {
            io.sockets.sockets[users[to]].emit('chat::message', {by, message})
          }
        } catch (e) {console.log(e)}
      })

      socket.on('disconnect', () => {
        try {
          delete users[socket.user.name]
        } catch (e) {console.log(e)}
      })
    }
  }
}

