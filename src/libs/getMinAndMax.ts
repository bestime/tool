import _Number from "./_Number";
import forEach from "./forEach";
import isLikeNumber from "./isLikeNumber";
import isNull from "./isNull";
import roundFixed from "./roundFixed";
import trim from "./trim";

type TReturnV = number | undefined | null

function defaultHandler (data: any):TReturnV {
  if(isLikeNumber(data)) {
    return _Number(data)
  } else {
    return undefined
  }
}

/**
 * 获取书中的最小和最大值
 * @param data - 原始数据
 * @param spaceRatio 默认值：0，根据最小、最大值的差值，将最小值减小几倍，将最大值增大几倍
 * @param handler 迭代函数（复杂结构需要），默认仅处理数字
 * @returns 计算后的最大、最小值
 */
export default function getMinAndMax<T> (data: Array<T>, spaceRatio=0, handler?: (item: T) => TReturnV) {
  
  let min: TReturnV;
  let max:TReturnV
  let decimals = 0
  forEach(data, function (item) {
    const v = handler ? handler(item) :defaultHandler(item)
    decimals = Math.max(trim(v).replace(/^.*\.(.*?)0*$/, '$1').length, decimals)
    if(!isNull(v)) {
      min = isNull(min) ? v : Math.min(min, v)
      max = isNull(max) ? v : Math.max(max, v)
    }
  })

  if(!isNull(min) && !isNull(max)) {
    const diff = max - min
    const overNum = diff * spaceRatio
    min = +roundFixed(min - overNum, decimals)
    max = +roundFixed(max + overNum, decimals)
  }

  return {
    min,
    max
  }
}