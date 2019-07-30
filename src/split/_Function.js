const getType = require('./getType')
function emptyFunction () {}
const name = 'Function'


function _Function (data, def) {
  const tempFun = getType(def) === name ? def : emptyFunction
  return getType(data)===name ? data : tempFun
}

module.exports = _Function