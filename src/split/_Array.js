import isArray from './isArray'
import JSONPARSE from './JSONPARSE'
import { TYPE_ARRAY } from './basic/constant'

export default function _Array (data) {
  return isArray(data) ? data : JSONPARSE(data, TYPE_ARRAY)
}