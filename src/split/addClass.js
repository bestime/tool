const hasClass = require('./hasClass')
const isArray = require('./isArray')
const forEach = require('./forEach')
const trim = require('./trim')

/**
 * 添加class
 * @param {object} element # dom元素 
 * @param {String || Array} names # 需要增加的className。可接受单个字符串或数组 
 */
module.exports = function (el, names) {
  var res = el.className
  var arr = isArray(names) ? names : [names]
  
  forEach(arr, function (item) {
    item = trim(item)
    if(!hasClass(res, item)) {
      res += res ? ' ' + item : item;
    }
  })

  if (res !==el.className) {
    el.className = res
  }
}