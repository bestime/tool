import getType from './getType'
import { TYPE_OBJECT } from './basic/constant'
/**
 * 判断是否是对象
 * @param {*} variate 需要判断的数据
 * @return {Boolean}
 */
export default function isObject (variate) {
  return getType(variate) === TYPE_OBJECT
}