import _String from './_String'
import type { TKvPair } from './help/type-declare'
import isKvPair from './isKvPair'
import param from './param'
import parseQuery from './parseQuery'
import trim from './trim'

 /**
   * 为url链接拼接参数
   * @param url - url地址。可带查询参数由 ”{{包裹}}”
   * @param searchString - 查询参数
   * @returns string 拼接后的url地址
   * @example
   * ```js
   * urlToGet('/parent_{{ pid }}/info/{{ uid }}/detail?c=5&', {
   *   name: '张三',
   *   skill: [1, 2, 3, 4, 5]
   * })
   * urlToGet('1111111111', 'a=0&b=2')
   * urlToGet('2222222222', 'a=0&b=2')
   * urlToGet('333333333?c=5&', 'a=0&b=2')   
   * ```
   * 
   */
export default function urlToGet (url: string, data: string | TKvPair) {
  url = _String(url)

  let realData = isKvPair(data) ? data : parseQuery(data);
  

  // 解析动态url参数，按 "{{}}" 区分
  url = url.replace(/({{)(.*?)(}})/g, function (_, pre, key, suf) {
    key = trim(key)
    const value = realData[key]
    delete realData[key]
    return value
  })
  
  const oldQuery = parseQuery(url)

  

  // 覆盖已存在的数据
  realData = Object.assign(oldQuery, realData)
  const str = param(realData)

  if(str) {
    url = url.replace(/\?.*/, '');
    url = url + '?' + str
  }
  return url;
}

