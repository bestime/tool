const isFunction = require('./_Function')

function some (arr, handle) {
  if(!isFunction(handle)) return;
  var res = false;
  for(var a = 0, len = arr.length; a < len; a++) {
    if(handle(arr[a], a, arr)) {
      res = true
      break;
    }
  }
  return res
}

module.exports = some