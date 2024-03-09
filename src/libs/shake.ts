import  type { BTDeepPartial } from './help/type-declare'

import isString from './isString'
import hpIsEmptyMap from './help/hpIsEmptyMap'
import isKvPair from './isKvPair'
import isArray from './isArray'
import isNull from './isNull'
import cloneEasy from './cloneEasy'


type TargetData = Record<string, any> | any[]

interface Options {
  /**
   * 是否移除空字符串。默认true
   */
  string?: Boolean,
  /**
   * 是否移除空数组。默认true
   */
  array?: Boolean,
  /**
   * 是否移除空键值对。默认true
   */
  kvPair?: Boolean,
}

function isNoData (data: any, emptyConfig: Options) {
  let result = false
  if(isArray(data) && emptyConfig.array && data.length === 0) {
    result = true
  } else if(isKvPair(data) && emptyConfig.kvPair && hpIsEmptyMap(data)) {
    result = true
  } else if(isString(data) && emptyConfig.string && data === '') {
    result = true
  } else if(isNull(data)) {
    result = true
  }
  return result
}



function hander<T extends TargetData> (data: T, options: Options): void {
  if(isKvPair(data)) {
    for(let key in data) {
      const item: any = data[key]
      if(isArray(item) || isKvPair(item)) {
        hander(item, options)
      }
      if(isNoData(item, options)) {
        delete data[key]
      } 
    }
  } 
}


/**
   * 移除无效数据，包括：空字符串，空对象，空数组。
   * 注：数组中的值不做处理，会影响数组长度
   * 
   * @param data - 将数据进行树摇
   * @param options - 配置参数
   * @returns 树摇后的数据
   */
export default function shake<T extends TargetData> (
  data: T,
  options?: Options
): BTDeepPartial<T> {
  const emptyConfig: Options = Object.assign({
    string: true,
    array: true,
    kvPair: true,
  }, options)
  data = cloneEasy(data)  
  hander(data, emptyConfig)
  return data
}






// interface Student {
//   name: string,
//   a: [1, 2],
//   job: {
//     test: undefined,
//     submig:() => number,
//     log: [
//       number,
//       {
//         name: string
//       }
//     ],
//     fornt: {
//       year: number
//     }
//   }
// }








