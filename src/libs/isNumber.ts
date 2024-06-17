import getType from './getType';
import { $numberTypeNameBig } from './help/hpConsts';

/**
 * 判断数据是否为数组
 * @param arg - 判断的值
 * @returns 真假值
 */
export default function isNumber(arg: any): arg is number {
  return getType(arg) === $numberTypeNameBig;
}
