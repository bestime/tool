module.exports = function (data) {
  if ( data==='0' ) {
    data = false
  } else {
    data = !!data
  }
  return data
}