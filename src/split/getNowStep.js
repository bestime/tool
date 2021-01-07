
import _Number from './_Number'
import isFunction from './isFunction'
import forEach from './forEach'

/**
 * 获取当前达到的位置
 * 参考对象：[1, 5, 9] 如果现在是6 => 上一个是5下一个是9 
 */
export default function getNowStep (arr, now, handle) {
  var one, findIndex = -1;
  now = _Number(now)
  forEach(arr, function (item, index) {
    if(isFunction(handle)) {
      one = _Number(handle(item))
    } else {
      one = _Number(item)
    }
    if(now >= one) {
      findIndex = index 
    }
  })
  return {
    index: findIndex,
    pre: arr[findIndex],
    next: arr[findIndex + 1]
  }
}
