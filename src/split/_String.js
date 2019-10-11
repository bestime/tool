function _String (data) {
  // typeof data === 'undefined' || data === null
  return data == null ? '' : String(data)
}

module.exports = _String