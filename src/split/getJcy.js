const _Object  = require('./_Object')
function getJcy (key) {
  var res = _Object(window['jcy'])[key]
  try { JSON.parse(res) } catch (e) {}
  return res
}

module.exports = getJcy