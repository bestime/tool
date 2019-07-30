const isArray = require('./isArray')

function some (arr, handle) {
  var bol = false
  if(isArray(arr)) {
    for(var a=0; a<arr.length; a++) {
      if(handle(arr[a], index)===true) {
        break;
      }
    }
  }
  return bol
}

module.exports = some