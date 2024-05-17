import cloneEasy from "./cloneEasy"

function getSortList<T> (data: T[]) {
  return data.map(function (item, index) {
    return {
      value: item,
      index
    }
  })
}

//@notice 目前比较粗超，相同元素的索引值会出现问题，后续再优化

/**
 * 获取排序后的索引列表。如 [2,1,3] 排序为 [1,2,3] 索引为 [1,0,2]
 * 
 * @param data - 原始数据
 * @param sortHandler 排序处理函数，与原生排序使用方式一致
 * @returns 索引列表
 * 
 */
export default function getSortIndex<T> (data: T[], sortHandler: (a: T, b: T) => number) {

  const cache = getSortList(data)
  const sorted = getSortList(data)
  
  sorted.sort(function (a, b) {
    return sortHandler(a.value, b.value)
  })  
  
  const idx = cache.map(function (c) {
    return sorted.findIndex(function (item) {
      return c.index === item.index
    })
  })

  return idx
}