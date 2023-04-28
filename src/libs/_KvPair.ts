/// <reference path="../../libs/help.d.ts"/>

import isKvPair from "./isKvPair"
import jsonParse from './help/hpJsonParse'



/**
   * 强制转换数据为键值对数据，如果是json字符串，会尝试解析，如果失败，则返回一个空Map
   * @param data - 转换的数据
   * @returns 键值对数据
   *
   * @example
   * ```javascript
   * // => {}
   * const data = _KvPair('abc')
   *
   * // => {}
   * const data2 = _KvPair([])
   *
   * // => {name: 'a'}
   * const data3 = _KvPair({name: 'a'})
   * ```
   */
export default function KvPair (data: any): IKvPair {
  if(!isKvPair(data)) {
    data = jsonParse(data)
    if(!isKvPair(data)) {
      data = {}
    }
  }

  return data

}