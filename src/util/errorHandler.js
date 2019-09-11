module.exports = {
  errorHandler: async (error, req, res, next) => {
    console.log(error.stack)
    res.status(400).json(error.message)
  }
}
