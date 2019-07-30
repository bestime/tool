const getType = require('./getType')


/**
 * 清空[undefined, null]数据
 * @param {*} data
 */
function clean (data) {
  var res;
  switch (getType(data)) {
    case 'Object':
      res = {}
      var key, item, index = -1;
      for(key in data) {
        item = data[key];
        typeof item === 'object' && (item = clean(item));
        if(canAdd(item)) {
          index++;
          res[key] = item;
        }
      }
      index === -1 && (res = undefined);
      break;
    case 'Array':
      res = []
      var index, len = data.length, item;
      for(index = 0; index < len; index++) {
        item = data[index]
        typeof item ==='object' && (item = clean(item));
        canAdd(item) && res.push(item);
      }
      res.length === 0 && (res = undefined);
      break;
    default: res = data;
  }
  function canAdd (data) {
    return typeof data !== 'undefined' && data !== null
  }
  return res
}

module.exports = clean