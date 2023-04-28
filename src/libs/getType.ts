import { $ObjectTypeNameBigPrototypeToString} from './help/hpConsts'


/**
 * 获取数据类型
 *
 * @param data - 需要判断的数据
 * @return 数据类型字符串
 */
export default function getType (data: any): string {
  return $ObjectTypeNameBigPrototypeToString.call(data).slice(8, -1)
}

