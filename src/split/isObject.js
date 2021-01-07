const getType = require('./getType')

/**
 * 判断是否是对象
 * @param {*} variate 需要判断的数据
 * @return {Boolean}
 */
function isObject (variate) {
  return getType(variate) === 'Object'
}

module.exports = isObject