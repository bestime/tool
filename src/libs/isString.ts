import getType from './getType'
import { $stringTypeNameBig } from './help/hpConsts'


export default function isString (data: any): data is string {
  return getType(data) === $stringTypeNameBig
}


