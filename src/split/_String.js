function _String (data) {
  // typeof data === 'undefined' || data === null
  return typeof data !== 'string' ? '' : String(data)
}

module.exports = _String