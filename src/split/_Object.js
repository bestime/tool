var JSONPARSE = require('./JSONPARSE')
var isObject = require('./isObject')

/**
 * 强制转换json
 * @param {*} data 需要转换的数据
 * @param {*} def 默认数据，如果data不是json，返回此数据
 */
module.exports = function (data, def) {
  var res = data
  if(!isObject(res)) {
    res = JSONPARSE(res)
    if(!isObject(res)) {
      res = isObject(def) ? def : {}
    }
  }
  return res
}