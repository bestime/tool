var isArray = require('./isArray')
var JSONPARSE = require('./JSONPARSE')

function _Array (data) {
  return isArray(data) ? data : JSONPARSE(data, 'Array')
}

module.exports = _Array