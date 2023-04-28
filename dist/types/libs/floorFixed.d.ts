/**
   * 保留几位小数并直接舍去后面的数（不进行四舍五入）
   * @param data - 长得像数字的字符串或数字
   * @param fractionDigits - 保留的小数位
   * @param rejection - 是否删除末尾所有的 "0"
   * @returns 结果
   */
export default function floorFixed(data: number | string, fractionDigits: number, rejection?: boolean): string;
