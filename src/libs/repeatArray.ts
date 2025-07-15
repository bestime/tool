/**
 * 循环补充数组到指定长度
 * @param data - 复制目标
 * @param length - 目标长度
 * @returns 结果
 */

export default function repeatArray<T> (target:T[], length: number) {
  let result:T[] = []
  while(result.length<length) {
    result = result.concat(target)
  }
  result = result.splice(0, length)
  return result
}