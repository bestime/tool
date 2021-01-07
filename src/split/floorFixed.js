import _Number from './_Number'
import padEnd from './padEnd'
import split from './split'
import trim from './trim'
import { ZERO_STRING } from './const'



/**
 * 
 * 保留几位小数并直接舍去后面的数（不进行四舍五入）
 * 
 * @param {Number|String} variate 数字或长得像数字的字符串
 * @param {Number} [digit=0] <正整数> 采用几位小数
 * 
 * @return {String}
 */
export default function floorFixed (variate, digit) {
  variate = trim(_Number(variate))
  digit = _Number(digit)

  var arr = split(variate, '.')
  var decp = arr[1] || ''
  if (decp.length < digit) {
    decp = padEnd(decp, digit, ZERO_STRING);
  }
  return digit < 1 ? arr[0] : arr[0] + '.' + decp.substr(0,digit)
}
