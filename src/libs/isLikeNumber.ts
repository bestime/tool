import isArray from "./isArray";

/**
 * 
 * @param value 看起来是否像一个数字
 * @returns 
 */
export default function isLikeNumber (value: any) {
  let result = false
  if(typeof value !== 'boolean' && !isArray(value)) {
    const data = Number(value)
    if(isNaN(data) || Infinity == Math.abs(data)) {
      result = false
    } else {
      result = true  
    }
  }

  return result
}