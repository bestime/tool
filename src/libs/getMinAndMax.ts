import _Number from "./_Number";
import forEach from "./forEach";
import isLikeNumber from "./isLikeNumber";
import isNull from "./isNull";
import roundFixed from "./roundFixed";
import trim from "./trim";

type TReturnV = number | undefined


function getDecm (offset: number) {
  let res = 0;
  if(offset<0.000009) {
    res = 7
  } else if(offset<0.00009) {
    res = 6
  }else if(offset<0.0009) {
    res = 5
  }else if(offset<0.009) {
    res = 4
  }else if(offset<0.09) {
    res = 3
  }else if(offset<0.5) {
    res = 2
  } else if(offset<1) {
    res = 1
  }
  

  return res
}

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
  let realMin: TReturnV
  let realMax: TReturnV
  let min: TReturnV;
  let max:TReturnV
  let overNum=0
  // let decimals = 0
  forEach(data, function (item) {
    const rn = getter ? getter(item) :defaultHandler(item)
    const v = isLikeNumber(rn) ? _Number(rn) : undefined
    // decimals = Math.max(trim(v).replace(/^.*\.(.*?)0*$/, '$1').length, decimals)
    if(!isNull(v)) {
      realMin = isNull(realMin) ? v : Math.min(realMin, v)
      realMax = isNull(realMax) ? v : Math.max(realMax, v)
    }
  })

  if(!isNull(realMin) && !isNull(realMax)) {
    let diff = realMax - realMin
    overNum = diff * spaceRatio   
    // 小于1的让外部自行处理格式化
    if(overNum<1) {
      min = realMin-overNum
      max = realMax+overNum
    } else {
      min = +roundFixed(realMin - overNum, 0)
      max = +roundFixed(realMax + overNum, 0)
    }

    if(formatter) {
      min = formatter(min)
      max = formatter(max)
    }
  }


  return {
    min,
    max,
    // _offset: overNum,
    // _real: {
    //   min: realMin,
    //   max: realMax,
      
    // }
  }
}