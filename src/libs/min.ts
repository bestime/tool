import getMinOrMax from "./help/getMinOrMax"


/**
 * 获取一个数组中的最小值
 * @param data 数组
 * @param handler 迭代函数
 * @returns 最大值
 */
export default function min<T> (data: Array<T>, handler: (item: T) => number | undefined) {
  return getMinOrMax('min', data, handler)
}