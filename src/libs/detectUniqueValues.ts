import forEach from "./forEach"
import { $undefinedValue } from "./help/hpConsts"

/**
 * 判断数组里有没有重复ID
 * @param key 键
 * @param data 数组
 * @returns 没有重复就返回原始数组
 */
export default function detectUniqueValues<T extends Record<string, any>> (key: keyof T, data: T[]) {
  let cache: Array<keyof T> = []
  let repIds: Array<keyof T> = []
  forEach(data, function (item) {
    const value = item[key]
    if(cache.includes(value)) {
      repIds.push(value)
    } else {
      cache.push(value)
    }
  })
  if(repIds.length) {
    throw `以下ID重复：[${repIds}]`
  }
  // @ts-ignore
  repIds = $undefinedValue
  // @ts-ignore
  repIds = $undefinedValue
  return data
}