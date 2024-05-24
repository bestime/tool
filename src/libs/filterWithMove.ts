/**
 * 筛选并从原始数组移除符合条件的数据
 * @param data - 原始数据
 * @param predicate - 迭代回调
 * @returns 筛选的结果
 */
export default function filterWithMove<T, S extends T> (data: T[], predicate: (value: T, index: number, array: T[]) => value is S): S[] {
  const result: S[] = []
  for(let index = 0;index<data.length;index++) {
    const item = data[index]
    const canUse = predicate(item, index, data)
    if(canUse) {
      result.push(item)
      data.splice(index--, 1)
    }
  }
  return result
}

