const getType = require('./getType')
const filter = require('./filter')


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
      res = filter(data, function (item) {
        typeof item === 'object' && (item = clean(item));
        return canAdd(item)
      })
      !res.length && (res = undefined);
      break;
    default: res = data;
  }
  return res
}


function canAdd (data) {
  return typeof data !== 'undefined' && data !== null
}

module.exports = clean