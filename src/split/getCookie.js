const FN_FORMAT_STRING_VALUE = require('./FN_FORMAT_STRING_VALUE')
const _Object = require('./_Object')
const isObject = require('./isObject')

/**
 * 获取浏览器cookie
 * @param {String|Object} [mark = {}] 需要以何种方式获取。
 * @param {String} [target = document.cookie] 查询的目标字符串
 * 
 * @return {*} 如果mark为字符串，则返回key为mark的值。如果mark为{}，则返回所有cookie的json合集
 */
function getCookie (mark, target) {
  target = target || document.cookie
  var res;
  if(isObject(mark) || mark == null) {
    res = _Object(mark)
    target.replace(/(.*?)=(.*?)(; |$)/g, function (g, key, value) {
      res[decodeURIComponent(key)] = FN_FORMAT_STRING_VALUE(decodeURIComponent(value))
    })
  } else {
    target.replace(new RegExp('(^|;\\s)' + mark + '=(.*?)($|(;\\s))'), function (g,prefix, value) {
      res = FN_FORMAT_STRING_VALUE(decodeURIComponent(value))
    })
  }
  return res
}

module.exports = getCookie







/**例子

ns.getCookie({}); // => {user-token: "1174295440", time1: "78"}
ns.getCookie('user-token'); // => 1174295440

*/

