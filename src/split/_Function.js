function emptyFunction () {}
const NAME = 'function'

function _Function (data) {
  return typeof data === NAME ? data : emptyFunction
}

module.exports = _Function