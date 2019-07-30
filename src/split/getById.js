

const isString = require('./isString')
function getById (id) {
  return isString(id) ? document.getElementById(id) : null
}

module.exports = getById