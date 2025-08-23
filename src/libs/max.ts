import getMinAndMax from "./getMinAndMax"


/**
 * 获取一个数组中的最大值
 * @param data 数组
 * @param handler 迭代函数
 * @returns 最大值
 */
export default function max<T> (data: Array<T>, handler: (item: T) => number | undefined) {
  return getMinAndMax(data, {
    spaceRatio: 0,
    getter:handler
  }).max
}