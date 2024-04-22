import cloneEasy from "./cloneEasy"

/**
 * 获取排序后的索引列表。如 [2,1,3] 排序为 [1,2,3] 索引为 [1,0,2]
 * @param data - 原始数据
 * @param sortHandler 排序处理函数，与原生排序使用方式一致
 * @returns 索引列表
 */
export default function getSortIndex<T> (data: T[], sortHandler?: (a: T, b: T) => number) {
  
  const sorted = cloneEasy(data).sort(sortHandler)
  
  const idx = sorted.map(function (c) {
    return data.findIndex(function (o) {
      return c === o
    })
  })

  return idx
}