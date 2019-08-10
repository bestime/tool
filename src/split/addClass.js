const hasClass = require('./hasClass')
const getType = require('./getType')
const forEach = require('./forEach')

/**
 * 添加class
 * @param {object} element # dom元素 
 * @param {String || Array} names # 需要增加的className。可接受单个字符串或数组 
 */
module.exports = function (el, names) {
  var res = el.className
  var arr = getType(names)==='Array' ? names : [names]
  forEach(arr, function (item) {
    if(!hasClass(res, item)) {
      res += res ? ' ' + item : item;
    }
  })

  el.className = res
}