import _Number from "./_Number";
import forEach from "./forEach";
import isLikeNumber from "./isLikeNumber";
import isNull from "./isNull";
import roundFixed from "./roundFixed";
import trim from "./trim";

type TReturnV = number | undefined

function defaultHandler (data: any):TReturnV {
  if(isLikeNumber(data)) {
    return _Number(data)
  } else {
    return undefined
  }
}

/**
 * 获取数字中的最小和最大值
 * @param data - 原始数据
 * @param config - 额外配置项
 * @param config.spaceRatio - 默认值：0，根据最小、最大值的差值，将最小值减小几倍，将最大值增大几倍
 * @param config.getter - 迭代函数（复杂结构需要），默认仅处理数字
 * @param config.formatter - 将最终结果格式化
 * @returns 计算后的最大、最小值
 */
export default function getMinAndMax<T> (data: Array<T>, config?: {
  spaceRatio?: number
  getter?: (item: T) => TReturnV,
  formatter?: (item: number) => number,
}) {
  
  const spaceRatio = config && config.spaceRatio ? config.spaceRatio : 0
  const getter = config && config.getter
  const formatter = config && config.formatter
  let min: TReturnV;
  let max:TReturnV
  // let decimals = 0
  forEach(data, function (item) {
    const v = getter ? getter(item) :defaultHandler(item)
    // decimals = Math.max(trim(v).replace(/^.*\.(.*?)0*$/, '$1').length, decimals)
    if(!isNull(v)) {
      min = isNull(min) ? v : Math.min(min, v)
      max = isNull(max) ? v : Math.max(max, v)
    }
  })

  if(!isNull(min) && !isNull(max)) {
    let diff = max - min
    const overNum = diff * spaceRatio

    let decimals = diff < 1 ? 4 : 0
    
    diff = +roundFixed(diff, decimals)    
    min = +roundFixed(min - overNum, decimals)
    max = +roundFixed(max + overNum, decimals)

    if(formatter) {
      min = formatter(min)
      max = formatter(max)
    }
  }

  return {
    min,
    max,

  }
}