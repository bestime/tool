
import { isString } from '@bestime/utils_base'


export default function (val: any) {
  if(!isString(val)) {
    val = JSON.stringify(val)
  }
  return val
}