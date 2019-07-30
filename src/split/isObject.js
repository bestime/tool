const getType = require('./getType')
function isObject (data) {
  return getType(data)==='Object'
}

module.exports = isObject