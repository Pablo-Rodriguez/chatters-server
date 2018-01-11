
module.exports = {
  morgan: {
    use: true,
    level: 'tiny'
  },
  db: {
    url: process.env.MONGODB_URI
  }
}

