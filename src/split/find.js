const isFunction = require('./_Function')

/**
 * find兼容版
 * @param {Arrau} arr 需要查找的数组
 * @param {Function<Boolean>} handle 回调处理函数
 * @return {*} 找到的结果
 */
function find (arr, handle) {
  var res;
  if(isFunction(handle)) {
    for(var a = 0, len = arr.length; a < len; a++) {
      if(handle(arr[a], a, arr)) {
        res = arr[a]
        break;
      }
    }
  }
  return res
}

module.exports = find