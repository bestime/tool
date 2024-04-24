import type { TKvPair } from "./help/type-declare"

export default function difference<T extends TKvPair | string | number | Date> (a: T[], b: T[], compareFn: (a: T, b: T) => boolean) {
  const result: T[] = []
  a.forEach(function (item) {
    const notFind = !b.some(function (cp) {
      return compareFn(cp, item)
    })
    if(notFind) {
      result.push(item)
    }
  })
  b.forEach(function (item) {
    const notFind = !a.some(function (cp) {
      return compareFn(cp, item)
    }) && !result.some(function (cp) {
      return compareFn(cp, item)
    })
    if(notFind) {
      result.push(item)
    }
  })
  // console.log("茶几", result)
  return result

}