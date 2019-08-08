const isFunction = require('./_Function')

function find (arr, handle) {
  if(!isFunction(handle)) return;
  var res;
  for(var a=0, len = arr.length; a < len; a++) {
    if(handle(arr[a], a, arr)) {
      res = arr[a]
    }
  }
  return res
}

module.exports = find