
const differenceCollect = require('./differenceCollect')

/**
 * 判断两个数组是否相等
 * @param {Array} one 第一个数组
 * @param {Array} two 第二个数组
 * @param {Function<Boolean>} [handle(v1,v2)] 每一项的回调函数
 * 
 * @return {Boolean}
 */
function isEqualArray (one, two, handle) {
  var res = differenceCollect(one, two, handle)
  return res[0].length || res[1].length ? false : true
}

module.exports = isEqualArray