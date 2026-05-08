import _Number from "./_Number";
import forEach from "./forEach";
import { $undefinedValue } from "./help/hpConsts";
import isLikeNumber from "./isLikeNumber";
import isNull from "./isNull";
import roundFixed from "./roundFixed";
import trim from "./trim";

type TReturnV = number | undefined

// 根据小数位得到一个微调值，定位0.0006是为了增加、减少后，进行四舍五入的结果正确
export function getRoundCel (decimals: number) {
  if(decimals<=0) return 0;
  // console.log("怎么", decimals, _Number('0.' + new Array(decimals-1).fill('0').join('') + '5'))
  // 
  return _Number('0.' + new Array(decimals-1).fill('0').join('') + '6')
}

export  function cmpDecms (data: number, decimals: number, dir: 1 | -1) {
  
  const newV = +roundFixed(data, decimals)
  // const oldDec = getDecm(data)
  let res = 0

  if(dir === -1) {
    if(newV > data) {
      res = _Number(newV) + dir * getRoundCel(decimals+1)
    } else {
      res = newV
    }
  } else if(dir === 1) {
    if(newV < data) {
      res = _Number(newV) + dir * getRoundCel(decimals+1)
    } else {
      res = newV
    }
  }

  // 不同小数位并且四舍五入后值相同，需要处理误差值
  
  res = +roundFixed(res, decimals)
  // console.log("最新", data, newV, '消除误差', getRoundCel(decimals+1), '=>', res)
  return res
}

export  function defaultHandler (data: any):TReturnV {
  if(isLikeNumber(data)) {
    return _Number(data)
  } else {
    return undefined
  }
}

/**
 * 取最低小数位
 * @param data 
 * @returns 
 */
export  function getDecm (data: number) {
  
  const str = trim(data)
  if(/\./.test(str)) {
    return trim(data).replace(/^\d+\.(0*)[^0]\d*$/, '$1').length+1
  } else {
    return 0
  }
}



/**
 * 取集合中的最小值，最大值，并扩大一定范围（不会去控制范围边界，这个由外部业务处理，比如最小值：0）
 * 
 * @param data 集合
 * @param ratio 扩大比例，根据极值之差计算
 * @param getter 迭代回调
 * @param decimals 期望小数位
 * @returns 
 */
export default function minMax<T> (
  data: T[],
  ratio: number,
  getter?: (item: T) => TReturnV,
  decimals?: number
) {
  let min: TReturnV;
  let max:TReturnV;
  let realMin: TReturnV
  let realMax: TReturnV
  let overNum = 0  
  

  forEach(data, function (item) {
    const rn = getter ? getter(item) :defaultHandler(item)
    const v = isLikeNumber(rn) ? _Number(rn) : $undefinedValue
    
    if(!isNull(v)) {
      realMin = isNull(realMin) ? v : Math.min(realMin, v)
      realMax = isNull(realMax) ? v : Math.max(realMax, v)
    }
  })

  if(!isNull(realMin) && !isNull(realMax)) {
    
    decimals = isNull(decimals) ? Math.max(getDecm(realMin), getDecm(realMax)) : decimals
    let diff = realMax - realMin
    overNum = diff * ratio



    min = realMin - overNum
    max = realMax + overNum

    
    // console.log("嘎嘎嘎11", realMin, realMax, getDecm(realMin), getDecm(realMax))
    // 消除极小值误差，避免四舍五入后相等
    min = cmpDecms(min, decimals, -1)
    max = cmpDecms(max, decimals, 1)
  }

  return {
    min,
    max
  }
}

