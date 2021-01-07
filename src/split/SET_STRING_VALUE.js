
import isString from './isString'
/**
 * 将非字符串的对象转为字符串
 * 用于存储cookie、localStorage等
 * 
 * @param {*} val 需要转换的数据
 * @return {String}
 */
export default function SET_STRING_VALUE (val) {
  if(!isString(val)) {
    val = JSON.stringify(val)
  }
  return val
}