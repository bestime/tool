import getType from './getType'
import { $stringTypeNameBig } from './help/hpConsts'


export default function isString (data: any) {
  return getType(data) === $stringTypeNameBig
}


