import isEmpty from "./isEmpty"
import isNull from "./isNull"
import trim from "./trim"

type TVu = string | number

/**
 * 格式化一个范围
 * @param from 起始值
 * @param to 终止值
 * @param connector 连接符
 * @returns 
 */
export default function formatRange (from?: TVu, to?: TVu, connector?: string) {
  const mark = isEmpty(connector) ? '-' : connector
  const avFrom = !isNull(from)
  const avTo = !isNull(to)
  let res = ''
  if(avFrom && avTo) {
    if(from === to) {
      res = trim(from)
    } else {
      res = `${trim(from)}${mark}${trim(to)}`
    }
  } else if(avFrom) {
    res = trim(from)
  } else {
    res = trim(to)
  }
  return res
}