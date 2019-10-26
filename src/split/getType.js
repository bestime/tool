const _UpperCase = require('./_UpperCase')

/**
 * 获取数据类型
 * @param {*} data 
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
      res = Object.prototype.toString.call(data).replace(/(.*\s)|.$/g, '')
  }
  
  return res
}

module.exports = getType

