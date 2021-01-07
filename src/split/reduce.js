/**
 * 兼容版reduce
 * @param {Array} list 循环的数组
 * @param {Function} handle 回调函数
 * @param {*} [initVal=list[0]] 初始值
 */
function reduce (list, handle, initVal) {
  var total = initVal,
      index = 0,
      len = list.length;

  if(typeof initVal === 'undefined') {
    total = list[0]
    index = 1
  }

  for (; index < len; index++) {
    total = handle(total, list[index], index, list)
  }

  return total
}

module.exports = reduce