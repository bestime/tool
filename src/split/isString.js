const getType = require('./getType')

function isString (data) {
  return getType(data)==='String'
}

module.exports = isString