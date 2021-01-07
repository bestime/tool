
import getType from './getType'
import forEach from './forEach'
import trim from './trim'

/**
 * 移除class
 * @param {object} element # dom元素 
 * @param {String || Array} cl # 需要移除的className。可接受单个字符串或数组 
 */

export default function removeClass (el, deleteNames) {
  var res = el.className
  deleteNames = getType(deleteNames) === 'String' ? [deleteNames] : deleteNames
  forEach(deleteNames, function (oneName) {
    res = res.replace(new RegExp('(\\s|^)' + oneName + '(\\s|$)', 'g'), ' ')
  })
  if(res !== el.className) {
    el.className = trim(res)
  }
}