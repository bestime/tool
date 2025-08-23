
/**
 * 截取数组从指定索引到指定长度（不改变原数组）
 * @param data 原始数组
 * @param fromIndex 开始索引
 * @param length 获取长度
 * @returns 
 */
export default function getArray<T> (data: T[], fromIndex: number, length: number) {
  const endIndex = Math.min(data.length, fromIndex+length)
  const res:T[] = []
  for(;fromIndex<endIndex; fromIndex++) {
    res.push(data[fromIndex])
  }

  return res
}