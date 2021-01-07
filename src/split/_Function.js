import { _FUNCTION_NAME, EMPTY_FUNCTION } from './basic/constant'

export default function _Function (data) {
  return typeof data === _FUNCTION_NAME ? data : EMPTY_FUNCTION
}