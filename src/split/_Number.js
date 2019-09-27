
/**
 * 
 * @param {*} data 需要转换的数据
 * @param {Boolean} canEmpty 是否允许空，处理input输入内容转数字时候可以用到
 * @return {Number|String}
 */
function _Number (data, canEmpty) {
  var res = Number(data),
      errorValue = 0;
  if (canEmpty) {
    if (data === '' || typeof data === 'undefined') {
      res = ''
      errorValue = ''
    }
  }
  return res === Infinity || /e/g.test(res) || isNaN(res) ? errorValue : res
}

module.exports = _Number