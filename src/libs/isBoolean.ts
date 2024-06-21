import getType from './getType'
import { $stringTypeNameBig } from './help/hpConsts'


export default function isBoolean (data: any): data is boolean {
  return typeof data === 'boolean'
}


