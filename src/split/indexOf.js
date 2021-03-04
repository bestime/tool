import isFunction from './isFunction'

/**
 * 查找指定索引
 * @param {Array} list 查找的数组
 * @param {*|Function<Boolean>} compire 对比的数据，或则回调函数
 * @return {Number} -1表示没找到
 */
export default function indexOf (list, compire) {
  var index = 0, findIndex = -1;
  while (index < list.length) {
    if(isFunction(compire) ? compire(list[index]) : list[index] === compire) {
      findIndex = index
      break;
    }
    index++
  }
  return findIndex
}