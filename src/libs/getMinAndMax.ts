import _Number from "./_Number";
import get from "./get";
import { $undefinedValue } from "./help/hpConsts";
import isNull from "./isNull";
import minMax, { cmpDecms, defaultHandler, getDecm } from "./minMax";


type TReturnV = number | undefined

interface IConfig<T> {
  spaceRatio?: number
  decimals?: number
  getter?: (item: T) => TReturnV,
  formatter?: (item: number) => number,
}

/**
 * @deprecated 已废弃，请使用minMax
 * 
 * 获取数字中的最小和最大值
 * @param data - 原始数据
 * @param config - 额外配置项
 * @param config.spaceRatio - 默认值：0，根据最小、最大值的差值，将最小值减小几倍，将最大值增大几倍
 * @param config.getter - 迭代函数（复杂结构需要），默认仅处理数字
 * @param config.formatter - 将最终结果格式化（这个选项准备移除）
 * @returns 计算后的最大、最小值
 */
export default function getMinAndMax<T> (data: Array<T>, config?: IConfig<T>) {  
  const spaceRatio = get(config, 0 as number, $undefinedValue, 'spaceRatio')!
  const getter = get(config, $undefinedValue, $undefinedValue, 'getter')
  const formatter = get(config, $undefinedValue as IConfig<T>['formatter'], $undefinedValue, 'formatter')

  const decimals = get(config, $undefinedValue, $undefinedValue, 'decimals')
  const res = minMax(data, spaceRatio, getter, decimals)

  if(formatter && !isNull(res.min) && !isNull(res.max)) {
    res.min = formatter(res.min)
    res.max = formatter(res.max)
  }

  return res
}