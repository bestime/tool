const _Object = require('./_Object')
const getType = require('./getType')
const forEach = require('./forEach')

/**
 * 将所有可枚举属性的值从一个或多个源对象复制到目标对象
 * @return {Object||Array} 返回对象，第一个对象被改变
 */
function assign () {
  let res = arguments[0], index = 1;
  let type = getType(res), len = arguments.length
  if(type === 'Object') {
    let key, item;
    // 合并对象
    for(index; index < len; index++) {
      item = _Object(arguments[index])
      for(key in item) {
        res[key] = item[key]
      }
    }
  } else if(res.length !== 'undefined') {
    // 合并数组
    for(index = 1; index < len; index++) {
      forEach(arguments[index], function (item) {
        if(type === 'String') {
          res += item
        } else {
          res.push(item)
        }
      })
    }
  }
  
  return res
}

module.exports = assign