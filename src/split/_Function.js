function emptyFunction () {}
const NAME = 'function'

function _Function (data, def) {
  const TEMP = typeof def === NAME ? def : emptyFunction
  return typeof data === NAME ? data : TEMP
}

module.exports = _Function