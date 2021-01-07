/**
 * 数组中的两个元素互换位置
 * @param {Array} arr 目标数组
 * @param {Number} index1 索引一
 * @param {Number} index2 索引二
 * 
 * @return {Array}
 */
export default function ArrayExchangeIndex (arr, index1, index2) {
  var maxLen = arr.length - 1, temp;
  index1 = index1 > maxLen ? maxLen : index1
  index2 = index2 > maxLen ? maxLen : index2
  temp = arr[index1]
  arr[index1] = arr[index2]
  arr[index2] = temp
  return arr
}
