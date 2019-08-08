
const isFunction = require('./_Function')
const clone = require('./clone')

function map (arr, handle) {
  if(!isFunction(handle)) return;
  var res = [];
  for(var a=0, len = arr.length; a < len; a++) {
    res.push(handle(clone(arr[a]), a, arr))
  }
  return res
}

module.exports = map