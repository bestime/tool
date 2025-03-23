import isNull from "./isNull";

type ISortItem = number | undefined | null

/**
 * 数组排序的迭代方法（多用于多个条件优先级排序）
 * @param way 排序方式 asc 从a至b升序；desc 从a至b降序
 * @param a 
 * @param b 
 * @returns 如果返回数字，怎么不管，如果返回undefined，则继续下一个排序规则，直到排序完成
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
    return ;
  } else if(isNull(a)) {
    return 1;
  } else if(isNull(b)) {
    return -1;
  } else {
    const diff = way === 'asc' ? a - b : b-a
    return diff === 0 ? undefined :diff
  }
}



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
//     age: 3
//   },
//   {
//     label: '5',
//     name: 2,
//     age: 2
//   },
// ]

// testList.sort(function (a, b) {
//   const dd = sortCompare('desc',a.name,b.name) ?? sortCompare('desc',a.age,b.age) ?? 0
//   // console.log("dd", dd)
//   return dd
// })