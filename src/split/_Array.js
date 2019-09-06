var isArray = require('./isArray')

module.exports = function (data, def) {
  const temp = isArray(def) ? def : []
  return isArray(data) ? data : temp  
}
