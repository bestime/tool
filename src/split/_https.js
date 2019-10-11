const $HTTP = require('./$HTTP')
function _https (url) {
  return $HTTP(url, 'https')
}

module.exports = _https