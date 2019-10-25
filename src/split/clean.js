const getType = require('./getType')
const filter = require('./filter')
const defaultType = require('./defaultType')

/**
 * 清空[undefined, null]数据
 * @param {*} data
 * @param {Boolean} removeEmptyStr 是否过滤空字符串，默认false
 */

function clean (data, removeEmptyStr) {
  return defaultType(getType(data), doOnce(data, removeEmptyStr))
}

function doOnce (data, removeEmptyStr) {
  var res;
  switch (getType(data)) {
    case 'Object':
      res = {}
      var key, item, index = -1;
      for(key in data) {
        item = data[key];
        typeof item === 'object' && (item = doOnce(item));
        if(canAdd(item)) {
          index++;
          res[key] = item;
        }
      }
      index < 0 && (res = undefined);
      break;
    case 'Array':
      res = filter(data, function (item) {
        typeof item === 'object' && (item = doOnce(item));
        return canAdd(item)
      })
      !res.length && (res = undefined);
      break;
    default: res = data;
  }


  
  function canAdd (data) {
    var bol = typeof data !== 'undefined' && data != null
    if (removeEmptyStr && getType(data)==='String') {
      bol = data !== ''
    }
    return bol
  }
  
  return res
}




module.exports = clean