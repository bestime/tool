import isArray from './isArray'
import isObject from './isObject'
import { TYPE_ARRAY, TYPE_OBJECT } from './basic/constant'
/**
 * JSON.parse 封装
 * 不要引用 defaultType 方法，底层函数互相调用，可能会出现问题
 * 
 * @param {*} res
 * @param {String} dataType 指定解析成哪种数据类型
 * @return {*}
 */
export default function JSONPARSE (res, dataType) {
  try { res = JSON.parse(res) } catch (e) {}
  if(dataType === TYPE_ARRAY) {
    if(!isArray(res)) {
      res = []
    }
  } else if(dataType === TYPE_OBJECT) {
    if(!isObject(res)) {
      res = {}
    }
  }
  return res
}