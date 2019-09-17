/**
 * getQuery 获取url查询参数
 * @param {String} str # [可选], 被查询的字符串，不填则为当前url
 * @return {Object} json对象
 */

const _Number = require('./_Number')
function getQuery (str) {
  var res = {}, href = '', val;
  try { href = window.location.href } catch (e) {};
  (typeof str === 'string' ? str : href).replace(/[^=?&]*=[^=&?]*/g, function (g) {
    val = decodeURIComponent(g.replace(/.*=/g, ''))
    if(/^\d+$/g.test(val)) {
      val = _Number(val)
    }
    res[decodeURIComponent(g.replace(/=.*/g, ''))] = val
  });
  return res
}

// getQuery('name=张三'); // => { name: "张三" }
// getQuery('???name=张三?&?age=26'); // => { name: "张三", age: "26" }
// getQuery(null); // => {}
// getQuery(undefined); // => {}
// getQuery(''); // => {}
// getQuery('abc'); // => {}

module.exports = getQuery
