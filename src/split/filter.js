
const isFunction = require('./_Function')

function filter (arr, handle) {
  if(!isFunction(handle)) return;
  var res = [];
  for(var a=0, len = arr.length; a < len; a++) {
    handle(arr[a], a, arr) && res.push(arr[a])
  }
  return res
}

module.exports = filter