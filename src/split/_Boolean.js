const getType = require('./getType')
const name = 'Boolean'

module.exports = function (data, def) {
  const temp = getType(def) === name ? def : false
  return getType(data) === name ? data : temp
}