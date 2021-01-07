import getType from './getType'
import forEach from './forEach'
import { TYPE_ARRAY, TYPE_OBJECT } from './basic/constant'
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
    case TYPE_ARRAY:
      res = []
      forEach(data, function (item, index) {
        handle(item, index) && res.push(item)
      })
      break;
    case TYPE_OBJECT:
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