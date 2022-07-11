import getType from './getType'
import { TYPE_OBJECT } from './constant'


export default function isObject (data: any): boolean {
  return getType(data) === TYPE_OBJECT
}