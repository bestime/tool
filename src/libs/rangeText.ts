import isEmpty from "./isEmpty";
import trim from "./trim";


/**
 * 格式化一个范围字符串
 * @param from 
 * @param connector 
 * @param to 
 * @returns 
 */
export default function rangeText (from: any, connector: string, to: any) {
  let res = ''
  const has0 = isEmpty(from)
  const has1 = isEmpty(to)
  if(!has0 && !has1) {
    res = `${from}${connector}${to}`
  } else if(!has0) {
    res = from
  } else if(!has1) {
    res = to
  }
  return trim(res)
}