
const isFunction = require('./_Function')
const clone = require('./clone')

/**
 * @param {Array} arr
 * @param {Function} handle
 * @param {Boolean} removeEmpty 【可选】是否需要移除空值
 * @param {String} toStringMark 【可选】转成字符的分隔符
 */
function map (arr, handle, removeEmpty, toStringMark) {
  var res = toStringMark != null ? '' : [];
  if(isFunction(handle) && arr && arr.length) {
    for(var a=0, val, len = arr.length; a < len; a++) {
      val = handle(clone(arr[a]), a, arr)
      if(!removeEmpty || val != null) {
        if(toStringMark != null) {
          res = res + (res ? toStringMark : '') + val
        } else {
          res.push(val)
        }
      }
    }
  }
  return res
}

module.exports = map