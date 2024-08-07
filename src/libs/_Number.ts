import isNumber from "./isNumber";
import isString from "./isString";
import trim from "./trim";


/**
   * 强制转换数据为字符串。支持百分号、千分位
   * @param data - 值
   * @returns 数字
   */
export default function _Number (data?: any): number {
  let isPercent = false
  let res = 0
  if(isNumber (data)) {
    res = data
  } else if(isString(data)) {
    data = trim(data, '*').replace(/,/g, '').replace(/%$/, function (_) {
      isPercent = true
      return ''
    })
    res = Number(data)
  } else {
    res = Number(data)
  }

  
  res = Math.abs(res) === Math.abs(Infinity) ||  isNaN(res) ? 0 : res

  if(isPercent) {
    res = res / 100
  }
  
  
  return res
}