const isFunction = require('./isFunction')
const isArray = require('./isArray')

function reduce (arr, handle, initVal) {
  if(isArray(arr) && isFunction(handle)) {
    var res = initVal,
        index = 0,
        len = arr.length;
    if(typeof initVal === 'undefined') {
      res = arr[0]
      index = 1
    }

    for (; index < len; index++) {
      res = handle(res, arr[index])
    }
    return res
  }

  // arr 不是数组 或者 handle 不是方法，就返回 initVal
  return initVal
}

module.exports = reduce