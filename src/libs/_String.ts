import isNull from './isNull'


  /**
   * 强制转化数据为字符串
   * @param data - 处理的值
   * @returns 实际值2
   */




export default function _String (data: any): string {
  return isNull(data) ? '' : String(data)
}