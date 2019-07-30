const getType = require('./getType')
const name = 'Object'

/**
 * 强制转换json
 * @param {*} data 需要转换的数据
 * @param {*} def 默认数据，如果data不是json，返回此数据
 */
module.exports = function (data, def) {
  const temp = getType(def)===name ? def : {}
  return getType(data)===name ? data : temp
}