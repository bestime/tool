import getType from './getType';
import { $ObjectTypeNameBig } from './help/hpConsts';
import type { TKvPair } from './help/type-declare';



/**
 * 判断数据是否为对象
 * @param data - 判断的值
 * @returns 真假值
 */
export default function isKvPair(arg: any): arg is TKvPair {
  return getType(arg) === $ObjectTypeNameBig;
}
