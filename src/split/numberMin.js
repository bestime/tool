
/**
 * 获取最小数字
 * @param {Number} data 
 * @param {Number} min 
 */


const _Number = require('./_Number')
function numberMin (data, min) {
  data = _Number(data)
  min = _Number(min)
  return data > min ? data : min
}


module.exports = numberMin


