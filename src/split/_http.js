const $HTTP = require('./$HTTP')
function _http (url) {
  return $HTTP(url, 'http')
}

module.exports = _http