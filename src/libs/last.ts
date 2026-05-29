import get from "./get"

/**
 * 取数组最后一项
 * @param data 数组
 * @param count 取最后第几项
 * @returns 
 */
export default function last<T> (data: T[], count?: number) {
  const len = get(count, 1)
  return data[data.length-len]
}