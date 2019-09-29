const _Object  = require('./_Object')
function getConfig (key) {
  var res = _Object(window['jcy'])
  try { JSON.parse(res) } catch (e) {}
  return key ? res[key] : res
}

module.exports = getConfig