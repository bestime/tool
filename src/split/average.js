
const allocateNumber = require('./allocateNumber')

/**
 * 计算平均数，由于有些数并无法除尽，所以最后一位作为微调（可能少点，可能多点）。
 * 保证最终的和加起来是传入的数字
 * @param {Number} section 分成几份，最小值为 1
 * @param {Number} num 被拆分的数字
 * @param {Number} [decimal=0] 保留几位小数，默认0
 * 
 * @return {Array<String>} list 字符串数组
 */
module.exports = function (section, num, decimal) {
  return allocateNumber(num, section, decimal)
}