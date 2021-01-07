import isObject from './isObject'
import JSONPARSE from './JSONPARSE'

/**
 * 强制转换json
 * 会自动处理json字符串
 * @param {*} data 需要转换的数据
 */
export default function _Object (data) {
  return isObject(data) ? data : JSONPARSE(data, 'Object')
}