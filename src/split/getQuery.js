const FN_FORMAT_STRING_VALUE = require('./FN_FORMAT_STRING_VALUE')

// getQuery('name=张三'); // => { name: "张三" }
// getQuery('???name=张三?&?age=26'); // => { name: "张三", age: 26 }
// getQuery(null); // => {}
// getQuery(undefined); // => {}
// getQuery(''); // => {}
// getQuery('abc'); // => {}

/**
 * @method getQuery
 * @author Bestime
 * @describe 获取url查询参数
 * @param {String} [str] 被查询的字符串，默认为当前url
 * @return {Object} json对象
 */
function getQuery (str) {
  var res = {}, href = '';
  try { href = window.location.href } catch (e) {};

  (typeof str === 'string' ? str : href).replace(/([^=&?/#]*?)=([^=&?/#]*)/g, function (_, key, val) {
    res[decodeURIComponent(key)] =  FN_FORMAT_STRING_VALUE(val)
  });

  return res
}


module.exports = getQuery