
import isString from '../isString'


export default function (val: any) {
  if(!isString(val)) {
    val = JSON.stringify(val)
  }
  return val
}