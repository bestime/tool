const _UpperCase = require('./_UpperCase')
const _toString = Object.prototype.toString

/**
 * 获取数据类型
 * 
 * @param {*} data 需要判断的数据
 * @return {String} 数据类型
 */
function getType (data) {
  let res = typeof data
  switch (res) {
    case 'number':
    case 'function':
    case 'string':
    case 'undefined':
    case 'boolean':
      res = _UpperCase(res, 0)
      break;
    default:
      res = _toString.call(data).slice(8, -1)
  }
  
  return res
}

module.exports = getType
