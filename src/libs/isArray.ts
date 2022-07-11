import getType from './getType'
import { TYPE_ARRAY } from './constant'

export default function isArray (data: any): boolean {
  return getType(data) === TYPE_ARRAY
}