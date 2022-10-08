import getType from './getType'
import { $ObjectTypeNameBig } from './help/hpConsts'


export default function isKvPair (data: any): boolean {
  return getType(data) === $ObjectTypeNameBig
}