import _Number from './_Number'
import padEnd from './padEnd'
import split from './split'
import _String from './_String'
import { ZERO_STRING } from './basic/constant'

/**
 * 
 * toFixed优化版：原生toFixed对于 (3.335).toFixed(2) 结果为：3.33，理想结果为3.34
 * 
 * 保留几位小数四舍五入
 * 
 * @param {Number|String} variate 数字或长得像数字的字符串
 * @param {Number} [digit=0] <正整数> 采用几位小数
 * @param {Boolean} [rejection=false] 是否社区末尾的所有0
 * 
 * @return {String}
 */
export default function roundFixed (variate, digit, rejection) {
  digit = _Number(digit)
  variate = _Number(variate)
  
  // 保留机位就乘几次10
  var multiple = Math.pow(10, digit)

  //保留机位小数并四舍五入
  var res = _String(Math.round(variate * multiple) / multiple);

  if (digit > 0) {
    const chai = split(res, '.')
    const intp = chai[0]; // 整数部分
    var decp = chai[1] || ''; // 小数部分
    
    if (decp.length < digit) {
      decp = padEnd(decp, digit, ZERO_STRING)
      if(rejection) {
        decp = decp.replace(/0+$/, '')
      }
      if(decp) {
        res = intp + '.' + decp;
      } else {
        res = intp
      }
    }
  }

  return res;
}
