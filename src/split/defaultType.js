import _Boolean from './_Boolean'
import _Number from './_Number'
import _String from './_String'
import _Function from './_Function'
import _Object from './_Object'
import _Array from './_Array'
import { TYPE_FUNCTION, TYPE_OBJECT, TYPE_ARRAY, TYPE_STRING, TYPE_NUMBER, TYPE_BOOLEAN } from './const'


/**
 * 强制抓换数据类型
 * @param {String} type 需要的数据类型
 * @param {*} [data=null] 判断的数据
 * 
 * @return {*} 理想数据类型的数据
 */
export default function defaultType (type, data) {
  let res = data
  switch (type) {
    case TYPE_FUNCTION: res = _Function(data); break;
    case TYPE_OBJECT: res = _Object(data); break;
    case TYPE_ARRAY: res = _Array(data); break;   
    case TYPE_STRING: res = _String(data); break;   
    case TYPE_NUMBER: res = _Number(data); break;   
    case TYPE_BOOLEAN: res = _Boolean(data); break;
  }
  
  return res
}