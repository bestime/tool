import isEmpty from "./isEmpty";
import isNull from "./isNull";

/**
 * @deprecated 已废弃，单词拼写错误，请使用 “get”，新增了链式路径查找
 * 
 * 默认数据处理
 * @param placeValue - 无值时返回什么数据
 * @param value - 需要处理的数据。默认将 undefined、null、'' 视为无值
 * @param formatter - 数据格式化
 * @param whiteList 特殊需求。默认将 [‘-’] 也视为空数据
 * @returns 
 */
export default function defualtFormatter<T, R> (placeValue: R, value: T, formatter?: (value: NonNullable<T>) => R, whiteList?: string[]): R {
  if(placeValue as any === value as any) {
    return placeValue;
  } else if(isNull(value, whiteList) || isEmpty(value)) {
    return placeValue
  } else {
    const lv = value as NonNullable<T>
    return formatter ? formatter(lv) : lv as R
  }
}