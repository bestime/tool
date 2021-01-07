import getType from './getType'
import forEach from './forEach'

/**
 * 过滤数据，支持数组、json
 * @param {Array|Object} data 处理数据
 * @param {Function} handle 处理函数
 * 
 * @return {Array|Object} 过滤后的函数
 */
export default function filter (data, handle) {
  var res;
  switch (getType(data)) {
    case 'Array':
      res = []
      forEach(data, function (item, index) {
        handle(item, index) && res.push(item)
      })
      break;
    case 'Object':
      res = {}
      for(var key in data) {
        if(handle(data[key], key)) {
          res[key] = data[key]
        }
      }
      break;
  }
  
  return res
}