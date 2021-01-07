var JSONPARSE = require('./JSONPARSE')
var isObject = require('./isObject')

/**
 * 强制转换json
 * 会自动处理json字符串
 * @param {*} data 需要转换的数据
 */
function _Object (data) {
  return isObject(data) ? data : JSONPARSE(data, 'Object')
}

module.exports = _Object