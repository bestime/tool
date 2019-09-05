const _Object  = require('./_Object')

function setJcy (key, val) {
  window['jcy'] = _Object(window['jcy'])
  window['jcy'][key] = val
}

module.exports = setJcy