import isArray from "./isArray";
import trim from "./trim";

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
  const str = trim(value)
  
  return /^(-|\+)?\d+(\.?\d+)?$/.test(str)
}

