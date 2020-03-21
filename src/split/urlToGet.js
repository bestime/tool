var _String = require('./_String')
var param = require('./param')
var isArray = require('./isArray')
var isObject = require('./isObject')

/*

urlToGet('1111111111', 'a=0&b=2')
urlToGet('2222222222', 'a=0&b=2')
urlToGet('333333333?c=5&', 'a=0&b=2')
urlToGet('333333333?c=5&', {
  name: '张三',
  skill: [1, 2, 3, 4, 5]
})

*/


/**
 * url 和 查询参数 组合成一个GET方式的链接 
 * @param {String} url 
 * @param {String|Object} searchString 查询条件 例：a=2&b=3&c=4
 * @return {String} 处理后的结果，一个完整url链接
 */
function urlToGet (url, searchString) {
  url = _String(url).replace(/&*$/g, '').replace(/\?*$/, '');
  if(isObject(searchString) || isArray(searchString)) {
    searchString = param(searchString)  
  } else {
    searchString = _String(searchString).replace(/^&*/, '');
  }
  
  searchString && (url += (/\?/.test(url) ? '&' : '?') + searchString);
  // console.log('url =>' , url)
  return url;
}

module.exports = urlToGet