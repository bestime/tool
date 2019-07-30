const getType = require('./getType')

function isFunction (data) {
  return getType(data)==='Function'
}

module.exports = isFunction