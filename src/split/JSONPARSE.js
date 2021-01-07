var isArray = require('./isArray')
var isObject = require('./isObject')

/**
 * JSON.parse 封装
 * 不要引用 defaultType 方法，底层函数互相调用，可能会出现问题
 * 
 * @param {*} data
 * @param {String} dataType 指定解析成哪种数据类型
 * @return {*}
 */
function JSONPARSE (data, dataType) {
  var res = data;
  try { res = JSON.parse(data) } catch (e) {}
  if(dataType === 'Array') {
    if(!isArray(res)) {
      res = []
    }
  } else if(dataType === 'Object') {
    if(!isObject(res)) {
      res = {}
    }
  }
  return res
}

module.exports = JSONPARSE