import { $maxNum } from "./help/hpConsts"


let count = 1
let prefix = 'ID_'

/**
 * 获取当前app自增的唯一会话ID，仅用来区分key值，每次程序运行结果可能不一样
 */
export default function getUniqSessionId () {
  const res = prefix + count
  count++

  if(count>$maxNum) {
    prefix = prefix + '_'
    count = 1
  }

  return res
}