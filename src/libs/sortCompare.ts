import { $undefinedValue } from "./help/hpConsts";
import isNull from "./isNull";

type ISortItem = number | undefined | null

/**
 * 数组排序的迭代方法（多用于多个条件优先级排序，此方法会将空值放在最后）
 * @param way 排序方式 asc 从a至b升序；desc 从a至b降序
 * @param a 
 * @param b 
 * @returns 如果返回数字，则不管，如果返回undefined，则继续下一个排序规则，直到排序完成
 * 
 * @example
 * ```ts
 * 
 * data.sort(function (a, b) {
 *   const sort01 = ortCompare('asc', a.price, b.price)
 *   const sort02 = ortCompare('asc', a.age, b.age)
 *   return sort01 ?? sort02 ?? 0
 * })
 * ···
 */
export default function sortCompare (way: 'asc' | 'desc',a: ISortItem, b:ISortItem) { 
  
  if(isNull(a) && isNull(b)) {
    return $undefinedValue;
  } else if(isNull(a)) {
    return  1;
  } else if(isNull(b)) {
    return -1;
  } else {
    const diff = way === 'asc' ? a - b : b-a
    return diff === 0 ? $undefinedValue :diff
  }
}


// const a: any[] = [undefined,undefined,undefined,undefined,undefined,2,undefined,6,1,9,1,8,undefined,10, 5, undefined]
// const b: any[] = [null,null,null,null,null,2,null,6,1,9,1,8,null,10, 5, null]
// const e = b.sort(function(a: any, b: any){
//   return sortCompare('desc', a, b) ?? -1
// })
// console.log("e", e)





// const testList = [
//   {
//     label: '1',
//     name: 1,
//     age: 2
//   },
//   {
//     label: '3',
//     name: null,
//     age: 1
//   },
//   {
//     label: '2',
//     name: 2,
//     age: 5
//   },
//   {
//     label: '4',
//     name: null,
//     age: 30
//   },
//   {
//     label: '5',
//     name: 2,
//     age: undefined
//   },
//   {
//     label: '6',
//     name: null,
//     age: 21
//   },
// ]

// testList.sort(function (a, b) {
//   const dd = sortCompare('desc',a.name,b.name) ?? sortCompare('desc',a.age,b.age)
//   console.log("对比名字",a.name, b.name, '=>',a.label, b.label,' => ',sortCompare('desc',a.name,b.name))
//   // console.log("dd", dd)
//   return dd ?? 0
// })

// console.log("testList", testList)