import { _FUNCTION_NAME } from './constant'

export default function isFunction (variate: any) {
  return typeof variate === _FUNCTION_NAME
}