
import _Object from './_Object'
import isObject from './isObject'
import FN_FORMAT_STRING_VALUE from './FN_FORMAT_STRING_VALUE'
import { DECODE_URI_COMPONENT } from './basic/browser'

/**
 * 获取浏览器cookie
 * @param {String|Object} [mark = {}] 需要以何种方式获取。
 * @param {String} [target = document.cookie] 查询的目标字符串
 * 
 * @return {*} 如果mark为字符串，则返回key为mark的值。如果mark为{}，则返回所有cookie的json合集
 */
export default function getCookie (mark, target) {
  target = target || document.cookie
  var res;
  if(isObject(mark) || mark == null) {
    res = _Object(mark)
    target.replace(/(.*?)=(.*?)(; |$)/g, function (g, key, value) {
      res[DECODE_URI_COMPONENT(key)] = FN_FORMAT_STRING_VALUE(DECODE_URI_COMPONENT(value))
    })
  } else {
    target.replace(new RegExp('(^|;\\s)' + mark + '=(.*?)($|(;\\s))'), function (g,prefix, value) {
      res = FN_FORMAT_STRING_VALUE(DECODE_URI_COMPONENT(value))
    })
  }
  return res
}








/**例子

ns.getCookie({}); // => {user-token: "1174295440", time1: "78"}
ns.getCookie('user-token'); // => 1174295440

*/

