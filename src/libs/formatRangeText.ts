import _Number from "./_Number"
import defualtFormatter from "./defualtFormatter"
import isEmpty from "./isEmpty"



export default function formatRangeText (name: string, from: any, to: any, unit?: string) {
  const hasMin = !isEmpty(from)
  const hasMax = !isEmpty(to)
  unit = defualtFormatter('', unit)
  
  
  


  let message = ''
  if(hasMin && hasMax) {
    message = name  + '范围为：' + from + '-' + to + unit
  } else if(hasMin) {
    message = name  + '最小值为：' + from + unit
  } else if(hasMax) {
    message = name  + '最大值为：' + to + unit
  }

  return message
}