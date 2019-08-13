
const isFunction = require('./_Function')
const getType = require('./getType')

/**
 * 改进版forEach，循环中 return 非空数据将执行 break 跳出循环
 * 
 * @param {Array, Object} data 数组
 * @param {Function} handle 处理函数
 * @param {String} type 数据类型，可循环json
 */
function forEach (data, handle, type) {
  if(!isFunction(handle)) return;
  var res, index = 0, len, key;

  switch (type) {
    case 'json': 
      for(key in data) {
        res = handle(data[key], key, index, data)
        index++
        if(checkRes(res)){
          break;
        }
      }
      break;
    default:
      for(len = data.length; index < len; index++) {
        res = handle(data[index], index, data)
        if(checkRes(res)){
          break;
        }
      }
  }
}


function checkRes (res) {
  return typeof res !== 'undefined' && getType(res) !== 'Null'
}

module.exports = forEach