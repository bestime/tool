import trim from "./trim";

const regStr = /(-|\+)?((\d+)|((\d,?)+\d+))(\.?\d+)?%?/.toString().replace(/(^\/)|(\/$)/g, '')

/**
 * 匹配数字的正则
 * @returns 
 */
export function getLikeNumberRegExp () {
  return regStr
}




  // const decimalReg = '(\\d+\\.?\\d+)'
  // const thousandsReg = '((\\d,?)+\\d+\\.?\\d+)'
  // const regStr = `^(-|+)?${decimalReg}|${thousandsReg}%?$`

/**
 * 
 * @param value 看起来是否像一个数字。可识别百分号、千分位
 * @example
 * ```
 * isLikeNumber('-123,456,789') => true
 * isLikeNumber('1,4,5.912%') => true
 * isLickNumber(1) => true
 * isLickNumber('2.36884') => true
 * isLickNumber(1/0) => false
 * isLickNumber(0/0) => false
 * isLickNumber('') => false
 * isLickNumber() => false
 * isLickNumber(null) => false
 * isLickNumber(true) => false
 * isLickNumber(false) => false
 * isLickNumber([]) => false
 * isLickNumber(function () {}) => false 
 * ```
 * @returns 
 */
export default function isLikeNumber (value: any) {
  const str = trim(value)
  const reg = new RegExp('^' + regStr + '$')
  
  return reg.test(str)
}






