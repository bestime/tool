import isNull from "../isNull"


/**
 * 获取一个数组中的最大值
 * @param data 数组
 * @param handler 
 * @returns 最大值
 */
export default function getMinOrMax<T> (mode: 'min' | 'max',data: Array<T>, handler: (item: T) => number) {
  let res: number | undefined
  data.forEach(function (item) {
    const v = handler(item)
    if(!isNull(v)) {
      if(isNull(res)) {
        res = v
      }  else {
        res = mode ==='max' ? Math.max(v, res) : Math.min(v, res)
      }
    }
  })
  return res
}