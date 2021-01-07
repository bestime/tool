import { MATH_MAX, MATH_MIN } from './basic/constant'

/**
 * 将数字转换至指定范围，如果超出指定范围，则取两端极值
 * 
 * * @param {Number} targetValue 最大值
 * @param {Number} minValue 最小值
 * @param {Number} maxValue 最大值
 * 
 * @return {Number}
 */
export default function numberRange (targetValue, minValue, maxValue) {
  targetValue = MATH_MIN(targetValue, maxValue)
  targetValue = MATH_MAX(targetValue, minValue)
  return targetValue
}