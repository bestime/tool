import isNull from "./isNull";
import _Number from "./_Number"

/**
 * 将一堆数字中的极值按差值的比例进行扩大。多用于echarts坐标轴的极值限制
 * @param ratio 扩大倍数
 * @param data 数据
 * @returns 
 */
export default function padMinMax (ratio: number, ...data: Array<Array<number | undefined>>) {
  let min: number | undefined;
  let max: number | undefined;
  data.forEach(function (item) {
    item.forEach(function (v) {
      const num = _Number(v)
      min = isNull(min) ? num : Math.min(min, num)
      max = isNull(max) ? num : Math.max(max, num)
    })
  })

  if(!isNull(min) && !isNull(max)) {
    const diff = max - min
    min = min - diff * ratio
    max = max + diff * ratio
  }

  return {
    min,
    max
  }
}
