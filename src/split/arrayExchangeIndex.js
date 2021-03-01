/**
 * 数组中的两个元素互换位置
 * @param {Array} arr 目标数组
 * @param {Number} index1 索引一（超出数组范围无效，不做处理）
 * @param {Number} index2 索引二（超出数组范围无效，不做处理）
 * 
 * @return {Array}
 */
export default function arrayExchangeIndex (arr, index1, index2) {
  var temp = arr.length;
  if(index1 < temp && index2 < temp && index2 >= 0 && index1 >= 0) {
    temp = arr[index1]
    arr[index1] = arr[index2]
    arr[index2] = temp
  }
  return arr
}
