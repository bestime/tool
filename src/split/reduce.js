const isFunction = require('./isFunction')

function reduce (arr, handle, initVal) {
  if(!isFunction(handle)) return;
  var res =  '', index = 0;
  if(typeof initVal !== 'undefined' && initVal !== null) {
    res = initVal
    index = 1
  }
  while (index < arr.length) {
    res = handle(res, arr[index])
    index++
  }
  return res
}

module.exports = reduce