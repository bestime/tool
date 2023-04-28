import _Number from './_Number'
import padEnd from './padEnd'
import split from './split'
import trim from './trim'
import { $zeroString } from './help/hpConsts'


/**
   * 保留几位小数并直接舍去后面的数（不进行四舍五入）
   * @param data - 长得像数字的字符串或数字
   * @param fractionDigits - 保留的小数位
   * @param rejection - 是否删除末尾所有的 "0"
   * @returns 结果
   */
export default function floorFixed (data: number|string, fractionDigits: number, rejection?: boolean) {
  data = trim(_Number(data))
  var res = ''
  var arr = split(data, '.')
  var decp = arr[1] || ''
  if (decp.length < fractionDigits) {
    decp = padEnd(decp, fractionDigits, $zeroString);
    if(rejection) {
      decp = decp.replace(/0+$/, '')
    }
  }

 

  if(fractionDigits < 1 || !decp) {
    res = arr[0]
  } else {
    res = arr[0] + '.' + decp.substring(0,fractionDigits)
  }
  
  return res
}

