
const isFunction = require('./_Function')
const getType = require('./getType')

/**
 * 改进版forEach，循环中 return 非空数据将执行 break 跳出循环
 * 
 * @param {Array} arr 数组
 * @param {Function} handle 处理函数
 */
function forEach (arr, handle) {
  if(!isFunction(handle) || !arr.length) return;
  var res,
      a = 0,
      len;
  for(len = arr.length; a < len; a++) {
    res = handle(arr[a], a, arr)
    if(typeof res !== 'undefined' && getType(res) !== 'Null'){
      break;
    }
  }
}

module.exports = forEach