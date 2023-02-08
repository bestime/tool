import isString from './isString'
import hpIsEmptyMap from './help/hpIsEmptyMap'
import isKvPair from './isKvPair'
import isArray from './isArray'
import isNull from './isNull'
import cloneEasy from './cloneEasy'

type TargetData = Record<string, any> | any[]

interface Options {
  string?: Boolean,
  array?: Boolean,
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

export default function clean<T extends TargetData> (
  data: T,
  options?: Options
): bestime.BTDeepPartial<T> {
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

// function test (data: bestime.BTDeepPartial<Student>) {
//   const a = data.job?.test
// }






