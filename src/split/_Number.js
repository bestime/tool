/**
 * 强制转数字，转换失败就为0
 * 
 */


function _Number(data) {
  return Number(data) || 0
}

module.exports = _Number