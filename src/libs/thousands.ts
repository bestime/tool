import _String from './_String'
import isString from './isString'

/**
 * 正则千分位转换，支持小数（任意字符串按位数相隔）
 * 
 * @param data 需要转换的字符
 * @param len 按多少位分隔一次，默认3
 * @param symbol 千分位替换符号，默认逗号
 */
export default function thousands (data: number | string, len?: number, symbol?: string) {
  len = len || 3
  symbol = symbol || ','
  const target = isString(data) ? data : _String(data)
  return target.replace(/([^.]*)?(\.)?(.*)?/, function(_, pre, dot, next) {
    return _String(pre).replace(new RegExp('(.(?=(.{'+ len +'})+$))', 'g'), '$1' + symbol) + _String(dot) + _String(next)
  }) 
  // return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, symbol || ',');
}