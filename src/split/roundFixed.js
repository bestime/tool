

const _Number = require('./_Number')
const padEnd = require('./padEnd')
const split = require('./split')
const _String = require('./_String')

const ZERO_STRING = '0'

/**
 * 
 * toFixed优化版：原生toFixed对于 (3.335).toFixed(2) 结果为：3.33，理想结果为3.34
 * 
 * 保留几位小数四舍五入
 * 
 * @param {Number|String} variate 数字或长得像数字的字符串
 * @param {Number} [digit=0] <正整数> 采用几位小数
 * 
 * @return {String}
 */
function roundFixed (variate, digit) {
  digit = _Number(digit)
  variate = _Number(variate)
  
  // 保留机位就乘几次10
  var multiple = Math.pow(10, digit)

  //保留机位小数并四舍五入
  var res = _String(Math.round(variate * multiple) / multiple);

  if (digit > 0) {
    const chai = split(res, '.')
    const intp = chai[0]; // 整数部分
    const decp = chai[1] || ''; // 小数部分
    
    if (decp.length < digit) {
      res = intp + '.' + padEnd(decp, digit, ZERO_STRING);
    }
  }

  return res;
}


module.exports = roundFixed