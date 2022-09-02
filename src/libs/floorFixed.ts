import _Number from './_Number'
import padEnd from './padEnd'
import split from './split'
import trim from './trim'
import { $zeroString } from './help/hpConsts'


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

