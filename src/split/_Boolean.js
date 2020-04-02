module.exports = function (data) {
  if(data === true || data === 'true' || data === '1' || data === 1) {
    return true
  } else {
    return false
  }
}