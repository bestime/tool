import getSortIndex from './getSortIndex'

/**
 * 按索引顺序对数组进行排序
 * @param data 需要排序的数据
 * @param index 索引列表
 * @returns 新数据
 */
export default function sortWithIndex<T> (data: T[], index: ReturnType<typeof getSortIndex>) {
  const result: T[] = []
  for(let a =0; a<data.length; a++) {
    result[a] = data[index[a]]
  }
  return result
}