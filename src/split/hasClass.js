
import isString from './isString'

export default function hasClass (obj, cl){
  var str = isString(obj) ? obj : obj.className 
  return new RegExp('(\\s|^)' + cl + '(\\s|$)').test(str); 
}