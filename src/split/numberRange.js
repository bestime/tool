/**
 * 将数字转换至指定范围，如果超出指定范围，则取两端极值
 * 
 * * @param {Number} targetValue 最大值
 * @param {Number} minValue 最小值
 * @param {Number} maxValue 最大值
 * 
 * @return {Number}
 */
function numberRange (targetValue, minValue, maxValue) {
  targetValue = Math.min(targetValue, maxValue)
  targetValue = Math.max(targetValue, minValue)
  return targetValue
}

module.exports = numberRange