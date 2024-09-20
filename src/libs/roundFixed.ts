import _Number from './_Number'
import padEnd from './padEnd'
import split from './split'
import _String from './_String'
import { $zeroString } from './help/hpConsts'


/**
 * 保留几位小数四舍五入
 * toFixed优化版，原生toFixed对于 (3.335).toFixed(2) 结果为：3.33，理想结果为3.34
 * @param data - 长得像数字的字符串或数字
 * @param fractionDigits - 保留的小数位
 * @param rejection - 是否删除末尾所有的 "0"
 * @returns 结果
 */
export default function roundFixed (data: number|string|null|undefined, fractionDigits: number, rejection?: boolean) {
  
  data = _Number(data)
  
  // 保留机位就乘几次10
  var multiple = Math.pow(10, fractionDigits)

  //保留机位小数并四舍五入
  var res = _String(Math.round(data * multiple) / multiple);

  if (fractionDigits > 0) {
    const chai = split(res, '.')
    const intp = chai[0]; // 整数部分
    var decp = chai[1] || ''; // 小数部分
    
    if (decp.length < fractionDigits) {
      decp = padEnd(decp, fractionDigits, $zeroString)
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
