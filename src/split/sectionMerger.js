/**
 * 区间合并
 * @param {Array} list 目标数组
 * @param {Number} [adjust=0] 微调数字。如果为1，则[[1,4],[5,6]] => [1,6]，理解为4和5是相邻的，可合并
 * @param {Boolean} [sort=false] 是否需要排序
 * 
 * @update 2019-12-16
 * @example sectionMerger([[1,5],[2,8],[9,10],[20,30]], true) => [[1,10], [20,30]]
 * 
 */
export default function sectionMerger (list, adjust, sort) {
  // 如果确定是排过序的，就不必排序了
  sort && list.sort(function (a, b) {
    return a[0] - b[0]
  })

  for(var a1, a2, index = 0, len = list.length; index < len; index++) {
    a1 = list[index]
    a2 = list[index + 1]
    if(typeof a2 == 'undefined') break;
    if(a1[1] >= a2[0] - adjust) {
      a2[0] = Math.min(a2[0], a1[0])
      a2[1] = Math.max(a2[1], a1[1])
      list.splice(index, 1)
      index--
    }  
  }
  return list
}