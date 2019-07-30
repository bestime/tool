var getType = require('./getType')
var name = 'Array'

module.exports = function (data, def) {
  const temp = getType(def) === name ? def : []
  return getType(data) === name ? data : temp  
}
