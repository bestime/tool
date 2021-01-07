
function FN_confirm () {
  var lock = false
  return function (handle) {
    if(!lock) {
      lock = true
      handle(function () {
        lock = false
      })
    }
  }
}

module.exports = FN_confirm