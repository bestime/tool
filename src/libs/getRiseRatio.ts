import isNull from "./isNull";
type TNull = undefined | null | ''
function isLick0 (data: any): data is TNull {
  return isNull(data) || data === 0
}

/**
 * 计算一个数据变化的增长率
 * @param from 
 * @param to 
 * @returns 
 */
export default function getRiseRatio (from?: number, to?: number) {
  if(isLick0(from) && isLick0(to)) return 0;

  if(isLick0(from)) return 1
  if(isLick0(to)) return -1

  return (to - from) / from
}

