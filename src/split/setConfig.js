const _Object  = require('./_Object')

function setConfig (key, val) {
  window['jcy'] = _Object(window['jcy'])
  window['jcy'][key] = val
}

module.exports = setConfig