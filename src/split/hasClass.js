
import isString from './isString'

/**
 * 是否包含某个className
 * @param {Element|String} obj 一个dom元素，或者一个className字符集
 * @param {String} targetClass 需要判断的className
 * @return {Boolean} 是否包含
 */
export default function hasClass (obj, targetClass){
  var str = isString(obj) ? obj : obj.className 
  return new RegExp('(\\s|^)' + targetClass + '(\\s|$)').test(str); 
}