import forEach from "./forEach"
import forEachTree from "./forEachTree"
import { $JSON_STRING, $undefinedValue } from "./help/hpConsts"

/**
 * 判断数组里有没有重复ID
 * @param key 键
 * @param data 数组（可以是树结构）
 * @returns 没有重复就返回原始数组
 */
export default function detectUniqueValues<T extends Record<string, any>> (key: keyof T, data: T[]) {
  let cache: Array<keyof T> = []
  let repIds: Array<T> = []
  forEachTree(data, function (item) {
    const value = item[key]
    if(cache.includes(value)) {
      repIds.push(item)
    } else {
      cache.push(value)
    }
  })
  if(repIds.length) {
    const message = $JSON_STRING(repIds)
    // @ts-ignore
    throw `以下[${key}]重复：${message}`
  }
  // @ts-ignore
  repIds = $undefinedValue
  // @ts-ignore
  repIds = $undefinedValue
  return data
}