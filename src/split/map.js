const clone = require('./clone')
const isArray = require('./isArray')
const isObject = require('./isObject')

/**
 * 带filter功能的 map
 * @param {Array || Object} data
 * @param {Function} handle 如果返回 null 并且 removeEmpty配置为true是，将不会添加到最终结果中
 * @param {Boolean} [removeEmpty=false] 是否需要移除空值
 * @param {String} [toStringMark=nul] 不为空则返回此符号分隔字符串
 * 
 * @retur {Array}
 */
function map (data, handle, removeEmpty, toStringMark) {
  var val, res = toStringMark == null ? [] : '';

  function commitValue (val) {
    if (toStringMark == null) {
      res.push(val)
    } else {
      res = res + (res ? toStringMark : '') + val
    }
  }

  if (isArray(data)) {
    for(var a=0, len = data.length; a < len; a++) {
      val = handle(clone(data[a]), a, data)
      if(removeEmpty && val == null) continue;
      commitValue(val);
    }
  } else if(isObject(data)) {
    for(var key in data) {
      val = handle(clone(data[key]), key, data)
      if(removeEmpty && val == null) continue;
      commitValue(val)
    }
  }
  return res
}

module.exports = map