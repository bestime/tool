import getType from './getType'
import isObject from './isObject'
import forEach from './forEach'
import { TYPE_OBJECT, TYPE_STRING } from './basic/constant'

/**
 * assign(target, ...sources)
 * 将所有可枚举属性的值从一个或多个源对象复制到目标对象
 * 
 * @param {Object|Array|String} target
 * @param {Object|Array|String} [arguments] 需要合并的数据
 * @return {Object|Array|String} 返回对象，第一个对象被改变
 */
export default function assign (target) {
  let index = 1;
  const type = getType(target);
  const args = arguments
  const argLen = args.length
  
  if(type === TYPE_OBJECT) { // json对象
    let key, item;
    for(index; index < argLen; index++) {
      item = args[index]
      if(isObject(item)) {
        for(key in item) {
          target[key] = item[key]
        }
      }
    }
  } else if(target.length) {
    for (index; index < argLen; index++) {
      forEach(args[index], function (item) {
        if(type === TYPE_STRING) {
          // 合并字符串
          target += item
        } else {
          // 合并数组
          target.push(item)
        }
      })
    }
  }
  
  return target
}