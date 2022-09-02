import getType from './getType'
import { $ArrayTypeNameBig } from './help/hpConsts'

export default function isArray (data: any): boolean {
  return getType(data) === $ArrayTypeNameBig
}