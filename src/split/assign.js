const _Object = require('./_Object')

/**
 * 将所有可枚举属性的值从一个或多个源对象复制到目标对象
 * @return {Object} 返回对象，第一个对象被改变
 */
function assign () {
  let res = _Object(arguments[0]),
      index = 1,
      len = arguments.length,
      key,
      item;
  while (index < len) {
    item = _Object(arguments[index])
    for(key in item) {
      res[key] = item[key]
    }
    index++;
  }
  return res
}

module.exports = assign