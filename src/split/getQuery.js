const FN_FORMAT_STRING_VALUE = require('./FN_FORMAT_STRING_VALUE')

/**
 * 获取url查询参数
 * @param {?String} str 可选, 被查询的字符串，不填则为当前url
 * @return {Object} json对象
 */
function getQuery (str) {
  var res = {}, href = '';
  try { href = window.location.href } catch (e) {};
  (typeof str === 'string' ? str : href).replace(/([^=?&]*)=([^=&?/#]*)/g, function (item, key, val) {
    res[decodeURIComponent(key)] =  FN_FORMAT_STRING_VALUE(val)
  });
  return res
}

// getQuery('name=张三'); // => { name: "张三" }
// getQuery('???name=张三?&?age=26'); // => { name: "张三", age: 26 }
// getQuery(null); // => {}
// getQuery(undefined); // => {}
// getQuery(''); // => {}
// getQuery('abc'); // => {}
module.exports = getQuery




