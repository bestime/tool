const getType = require('./getType')

function isArray (data) {
  return getType(data) === 'Array'
}

module.exports = isArray