import _Number from './_Number'
import padEnd from './padEnd'
import split from './split'
import _String from './_String'
import { ZERO_STRING } from './constant'


export default function roundFixed (data: number|string, fractionDigits: number, rejection?: boolean) {
  
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
      decp = padEnd(decp, fractionDigits, ZERO_STRING)
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
