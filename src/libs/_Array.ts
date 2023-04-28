import isArray from "./isArray"
import jsonParse from './help/hpJsonParse'




/**
   * 强制转换数据为数组，如果是json字符串，会尝试解析，如果失败，则返回一个空[]
   *
   * @param data - 待转换的数据
   * @returns 数组
   *
   * @example
   * ```javascript
   * // => []
   * const data = _Array('abc')
   *
   * // => []
   * const data3 = _Array({name: 'a'})
   * ```
   */
export default function _Array<T> (data: any): T[] {
  if(!isArray(data)) {
    data = jsonParse(data)
    if(!isArray(data)) {
      data = []
    }
  }
  return data
}