import { getType, isEmpty } from "@bestime/utils_base";
const funcStr = 'Function'

export default function isPromise<T> (value?: any): value is Promise<T> {
  let bol = false
  const type = getType(value)
  if(type === 'Promise') {
    bol = true
  } else if(!isEmpty(value)) {
    const isObj = type === 'Object' || type === funcStr
    if(isObj && getType(type) === funcStr) {
      bol = true
    }
  }

  return bol
}