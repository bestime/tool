/**
 * 判断参数是否是方法
 * @param {*} variate 需要判断的数据
 * @return {Boolean} isFunction
 */
function isFunction (variate) {
  return typeof variate === 'function'
}

module.exports = isFunction