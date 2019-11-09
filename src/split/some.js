const isFunction = require('./_Function')

function some (arr, handle) {
  var res = false;
  if(!isFunction(handle)) return res;
  if(arr && arr.length) {
    for(var a = 0, len = arr.length; a < len; a++) {
      if(handle(arr[a], a, arr) === true) {
        res = true
        break;
      }
    }
  }
  
  return res
}

module.exports = some