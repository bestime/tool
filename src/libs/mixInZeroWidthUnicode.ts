import _String from "./_String";
import { $zeroWidthCode } from "./help/hpConsts";
import split from "./split";



/**
 * 向字符串中添加零宽字符。（暂时用于排除同名表格单元格合并）
 * @param data - 需要处理的数据
 * @returns 
 */
export default function mixInZeroWidthUnicode (data: string) {
  const list = split(data, '')
  return list.join($zeroWidthCode)
}