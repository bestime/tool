import _UpperCase from './_UpperCase'
import { _TOSTRING} from './basic/constant'

/**
 * 获取数据类型
 * 
 * @param {*} data 需要判断的数据
 * @return {String} 数据类型
 */
export default function getType (data) {
  return _TOSTRING.call(data).slice(8, -1)
}

