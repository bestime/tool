import { _FUNCTION_NAME } from './basic/constant'

/**
 * 判断参数是否是方法
 * @param {*} variate 需要判断的数据
 * @return {Boolean} isFunction
 */
export default function isFunction (variate) {
  return typeof variate === _FUNCTION_NAME
}