module.exports = {
  wrap: function (fn) {
    return (req, res, next) => {
      fn(req, res).catch(next)
    }
  }
}
