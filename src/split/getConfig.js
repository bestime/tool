const _Object  = require('./_Object')
function getConfig (key) {
  var res = _Object(window['jcy'])
  return key ? res[key] : res
}

module.exports = getConfig