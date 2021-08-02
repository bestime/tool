
/**
 * 获取数组最近的（x）个索引
 * @param {Array} list 数组
 * @param {Number} currentIndex 当前索引
 * @param {Number} increase 增加多少个索引，可为负数
 * @return {Number} 计算后的目标索引
*/
export default function getNearestIndex (list, currentIndex, increase) {
  const length = list.length
  const maxIndex = length - 1;  
  currentIndex = Math.max(currentIndex, 0)
  currentIndex = Math.min(currentIndex, maxIndex)
  if(Math.abs(increase) > length) {
    increase = increase % length
  }
  
  currentIndex = currentIndex + increase
  
  if(increase < 0 && currentIndex < 0) {
    currentIndex = length + currentIndex
  } else if(increase > 0 && currentIndex > maxIndex) {
    currentIndex = currentIndex - length
  }

  return currentIndex
}