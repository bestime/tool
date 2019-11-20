var getType = require('./getType')
var defaultType = require('./defaultType')
var isObject = require('./isObject')
var FN_FORMAT_STRING_VALUE = require('./FN_FORMAT_STRING_VALUE')

/**
 * 递归数据格式化，多用于多层级json数据
 * 用于"后端数据"和"前端数据"格式不匹配造成程序报错
 * @param {any} layout 自定义数据格式 比如： a: { b: { c: [] } }
 * @param {any} data 返回和layout数据相同的格式，如果data中缺少某个数据，则添加，否则保持不变
 * 
 * @return {any} 返回的数据
 */

function dataLayout (layout, data) {
  data = defaultType(getType(layout), FN_FORMAT_STRING_VALUE(data))

  ;(function doOnce (item, fmt) {
    if(isObject(fmt)) {
      for(var key in fmt) {
        item[key] = defaultType(getType(fmt[key]), item[key])
        doOnce(item[key], fmt[key])
      }
    } else {
      item = defaultType(getType(fmt), fmt)
    }
  })(data, layout);

  return data
}

module.exports = dataLayout