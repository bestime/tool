

/**
 * 获取最大数字
 * @param {Number} data 
 * @param {Number} min 
 */

const _Number = require('./_Number')
function numberMax (data, min) {
  data = _Number(data)
  min = _Number(min)
  return data < min ? data : min
}

module.exports = numberMax