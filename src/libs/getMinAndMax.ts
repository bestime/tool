import _Number from "./_Number";
import forEach from "./forEach";
import isLikeNumber from "./isLikeNumber";
import isNull from "./isNull";

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
 * @param spaceRatio 根据最小、最大值的差值，将最小值减小几倍，将最大值增大几倍
 * @param handler 迭代函数
 * @returns 
 */
export default function getMinAndMax<T> (data: Array<T>, spaceRatio=0, handler?: (item: T) => TReturnV) {
  
  let min: TReturnV;
  let max:TReturnV
  forEach(data, function (item) {
    const v = handler ? handler(item) :defaultHandler(item)
    if(!isNull(v)) {
      min = isNull(min) ? v : Math.min(min, v)
      max = isNull(max) ? v : Math.max(max, v)
    }
  })

  if(!isNull(min) && !isNull(max)) {
    const diff = max - min
    const overNum = diff * spaceRatio
  }

  return {
    min,
    max
  }
}