const isArray = require('./isArray')
const isObject = require('./isObject')

/**
 * 清空无效数据
 * @param {*} data
 * @param {?removeEmptyStr} 是否需移除留空字符串，默认false
 * @return {*} data 与清理过的和传入数据相同格式的数据
 */
function clean (data, removeEmptyStr) {
  var res;
  if(isObject(data)) {
    res = {}
    var mpItem, key, temp;
    for(key in data) {
      mpItem = data[key]
      if(isArray(mpItem) || isObject(mpItem)) {
        temp = clean(mpItem, removeEmptyStr)
      } else {
        temp = mpItem
      }
      _filterData(temp, removeEmptyStr, function (useValue) {
        res[key] = useValue;
      });
    }
  } else if(isArray(data)) {
    res = []
    for(var index = 0, len = data.length; index < len; index++) {
      _filterData(clean(data[index], removeEmptyStr), removeEmptyStr, function (useValue) {
        res.push(useValue);
      });
    }
  } else {
    res = data
  }
  return res
}

/**
 * @param {*} data
 * @param {Boolean} removeEmptyStr  
 * @param {Function} callback  
 */
function _filterData (data, removeEmptyStr, callback) {
  if(removeEmptyStr) {
    if(data!='' && data !=null) {
      callback(data)
    }
  } else if(data !=null){
    callback(data)
  }
}


module.exports = clean