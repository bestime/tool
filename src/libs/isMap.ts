import getType from './getType'
import { $ObjectTypeNameBig } from './help/hpConsts'


export default function isMap (data: any): boolean {
  return getType(data) === $ObjectTypeNameBig
}