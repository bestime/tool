import isArray from './isArray'
import JSONPARSE from './JSONPARSE'

export default function _Array (data) {
  return isArray(data) ? data : JSONPARSE(data, 'Array')
}