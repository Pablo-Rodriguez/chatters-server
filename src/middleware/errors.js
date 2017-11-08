
module.exports = (Response) => {
  return function (err, req, res, next) {
    console.log(err)
    Response.sendError(res, Response.SERVER_ERROR)
  }
}
