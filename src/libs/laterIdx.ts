
/**
 * 一维数组转树结构
 * @param max - 索引最大值
 * @param current - 当前索引
 * @param increase - 调整多少索引，可为负数
 * @returns 结果
 */
export default function (max: number, current: number, increase: number): number {
  const length = max + 1
  
  current = Math.max(current, 0)
  current = Math.min(current, max)
  if(Math.abs(increase) > length) {
    increase = increase % length
  }
  
  current = current + increase
  
  if(increase < 0 && current < 0) {
    current = length + current
  } else if(increase > 0 && current > max) {
    current = current - length
  }

  return current
}