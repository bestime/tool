const isFunction = require('./_Function')

/**
 * 改进版forEach，循环中 return 非空数据将执行 break 跳出循环
 * 
 * @param {Array, Object} data 数组
 * @param {Function} handle 处理函数
 * @param {String} type 数据类型，可循环json
 */
function forEach (data, handle, type) {
  if(!isFunction(handle)) return;
  var index = 0;
  switch (type) {
    case 'json': 
      for(var key in data) {
        if(handle(data[key], key, index++, data) === true){
          break;
        }
      }
      break;
    default:
      for(var len = data.length; index < len; index++) {
        if(handle(data[index], index, data) === true){
          break;
        }
      }
  }
}

module.exports = forEach