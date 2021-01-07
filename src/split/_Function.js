import { _FUNCTION_NAME, EMPTY_FUNCTION } from './const'

export default function _Function (data) {
  return typeof data === _FUNCTION_NAME ? data : EMPTY_FUNCTION
}