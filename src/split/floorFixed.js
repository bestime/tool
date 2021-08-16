import _Number from './_Number'
import padEnd from './padEnd'
import split from './split'
import trim from './trim'
import { ZERO_STRING } from './basic/constant'



/**
 * 
 * 保留几位小数并直接舍去后面的数（不进行四舍五入）
 * 
 * @param {Number|String} variate 数字或长得像数字的字符串
 * @param {Number} [digit=0] <正整数> 采用几位小数
 * @param {Boolean} [rejection=false] 是否社区末尾的所有0
 * 
 * @return {String}
 */
export default function floorFixed (variate, digit, rejection) {
  variate = trim(_Number(variate))
  digit = _Number(digit)

  var arr = split(variate, '.')
  var decp = arr[1] || ''
  if (decp.length < digit) {
    decp = padEnd(decp, digit, ZERO_STRING);
    if(rejection) {
      decp = decp.replace(/0+$/, '')
    }
  }

  if(digit < 1 || !decp) {
    digit = arr[0]
  } else {
    digit = arr[0] + '.' + decp.substr(0,digit)
  }
  
  return digit
}
