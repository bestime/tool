import forEach from './forEach'
import getType from './getType'
import isFunction from './isFunction'
import { TYPE_NUMBER } from './basic/constant'

/**
 * 一维数组去重，返回新数组
 * @param {Array} arr 需要去重的数组
 * @param {Boolean} [isVague = false] 是否模糊去重; 默认：false; false: [3, '3'] => [3,'3']; true: [3, '3'] => [3];
 * @param {Function} [handle(String key)]循环处理函数，返回比较的key
 */

export default function unique (arr, isVague, handle) {
  var res = [], exist = {}, checkKey;
  forEach(arr, function (item) {
    checkKey = isFunction(handle) ? handle(item) : item
    checkKey = getType(checkKey) === TYPE_NUMBER || isVague ? checkKey : `k→${checkKey}`
    if(!exist[checkKey]) {      
      exist[checkKey] = true;
      res.push(item);
    }
  })

  return res;
}