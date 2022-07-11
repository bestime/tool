import getType from './getType'
import { TYPE_STRING } from './constant'


export default function isString (data: any) {
  return getType(data) === TYPE_STRING
}


