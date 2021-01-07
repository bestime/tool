

import hasClass from './hasClass'
import trim from './trim'
import forEach from './forEach'
import isArray from './isArray'

/**
 * 添加class
 * @param {object} element # dom元素 
 * @param {String || Array} names # 需要增加的className。可接受单个字符串或数组 
 */
export default function (el, names) {
  var res = el.className
  var arr = isArray(names) ? names : [names]
  
  forEach(arr, function (item) {
    item = trim(item)
    if(!hasClass(res, item)) {
      res += res ? ' ' + item : item;
    }
  })

  if (res !==el.className) {
    el.className = res
  }
}