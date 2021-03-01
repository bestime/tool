import { _FUNCTION_NAME, EMPTY_FUNCTION } from './basic/constant'
import isFunction from './isFunction'

export default function _Function (data) {
  return isFunction(data) ? data : EMPTY_FUNCTION
}