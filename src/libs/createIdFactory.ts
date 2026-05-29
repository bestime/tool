import { $maxNum } from "./help/hpConsts"
import isNull from "./isNull"

/**
 * 创建一个ID生成器，用于将字符串变为ID，相同字符串ID不变（仅当前会话有效，不可用于固定ID）
 * @param prefix 
 * @returns 
 */
export default function createIdFactory (prefix: string) {
  let cid = -1
  const data: Record<string, string> = {}

  return function (name: string) {
    if(isNull(data[name])) {
      cid++
      if(cid>=$maxNum) {
        prefix = `${prefix}${cid}_`
        cid = 0
      }
      data[name] = `${prefix}${cid}`
    }

    return data[name]
  }
}