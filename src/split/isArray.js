import getType from './getType'
import { TYPE_ARRAY } from './basic/constant'
export default function isArray (data) {
  return getType(data) === TYPE_ARRAY
}