
/**
 * 
 * @param {Array, Object} data 数组
 * @param {Function} handle 处理函数
 * @param {String} [type] 数据类型，可循环json
 * @param {Boolean} [reverse=false] 反转循环
 */
export default function forEach (data, handle, type, reverse) {
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
      if(reverse === true) {
        for(index = data.length - 1; index >= 0; index--) {
          if(handle(data[index], index, data) === true){
            break;
          }
        }
      } else {
        for(var len = data.length; index < len; index++) {
          if(handle(data[index], index, data) === true){
            break;
          }
        }
      }
  }
}
