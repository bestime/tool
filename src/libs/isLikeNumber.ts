import isArray from "./isArray";

/**
 * 
 * @param value 看起来是否像一个数字
 * @example
 * ```
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
  let result = false, data;
    if(typeof value !== 'boolean' && !isArray(value) && value !== void 0 && value !== null && value !== '') {
      data = Number(value)
      if(isNaN(data) || Infinity == Math.abs(data)) {
        result = false
      } else {
        result = true  
      }
    }

  return result
}

