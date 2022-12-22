/**
 * 在给定索引范围内，增减当前索引，如果超出范围，则按当前方向重新循环取值。
 * @param maxIndex - 最大索引
 * @param currentIndex - 当前索引
 * @param increase - 调整多少索引，可为负数
 * @returns 改变后的索引
 */
export default function changeIndex (
  maxIndex: number,
  currentIndex: number,
  increase: number
): number {
  if(maxIndex<0) return currentIndex
  
  const length = maxIndex + 1;
  currentIndex = (currentIndex + increase) % length;
  
  // 如果是负数，就加回来
  if (currentIndex < 0) {
    currentIndex = currentIndex + length;
  }
  
  return currentIndex === -0 ? 0 : currentIndex;
}
