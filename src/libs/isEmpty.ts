import isNull from "./isNull";

/**
 * 判断是否为空[null, undefined, '']
 * @params data - 判断的数据
 * @returns 判断结果
*/
export default function isEmpty (data: any) {
  return isNull(data) || data === ''
}