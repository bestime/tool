var isArray = require('./isArray')
var JSONPARSE = require('./JSONPARSE')

function _Array (data, def) {
  var res = data
  if (!isArray(data)) {
    res = JSONPARSE(data)
    if(!isArray(res)) {
      res = isArray(def) ? def : []
    }
  }
  return res
}

module.exports = _Array