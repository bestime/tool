const forEach = require('./forEach')
const isFunction = require('./isFunction')
const _Number = require('./_Number')

/**
 * 统计最大值、最小值、总和
 * @param {Array} arr 需要统计的数据
 * @param {Function} [handle] 回调处理函数，返回当前循环处理后的值，可不填
 * 
 * @return {Object} 统计信息
 */
function getMinAndMax (arr, handle) {
  var min,
      max,
      val,
      maxItem,
      minItem,
      sum = 0,
      hasHandle = isFunction(handle);

  forEach(arr, function (item) {
    val = _Number(hasHandle ? handle(item) : item)
    sum += val
    if(typeof max === 'undefined' || max < val) {
      max = val
      maxItem = item
    }

    if(typeof min === 'undefined' || min > val) {
      min = val
      minItem = item
    }
  })
  
  return {
    min: minItem,
    max: maxItem,
    sum: sum
  }
}

module.exports = getMinAndMax