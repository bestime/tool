

/**
   * 强制转换数据为字符串
   * @param data - 值
   * @returns 数字
   */
 export default function _Number (data: any): number {
  data = Number(data);
  return data === Math.abs(Infinity) ||  isNaN(data) ? 0 : data
}