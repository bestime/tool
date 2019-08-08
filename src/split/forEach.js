
const isFunction = require('./_Function')
const getType = require('./getType')

function forEach (arr, handle) {
  if(!isFunction(handle)) return;
  var res;
  for(var a = 0, len = arr.length; a < len; a++) {
    res = handle(arr[a], a, arr)
    if(typeof res !== 'undefined' && getType(res) !== 'Null'){
      break;
    }
  }
}

module.exports = forEach