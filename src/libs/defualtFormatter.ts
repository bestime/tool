import isNull from "./isNull";

/**
 * 默认数据处理
 * @param placeValue - 无值时返回什么数据
 * @param value - 需要处理的数据
 * @param formatter - 数据格式化
 * @returns 
 */
export default function defualtFormatter<T, R> (placeValue: R, value: T, formatter?: (value: NonNullable<T>) => R): R {
  if(placeValue as any === value as any) {
    return placeValue;
  } else if(isNull(value)) {
    return placeValue
  } else {
    const lv = value as NonNullable<T>
    return formatter ? formatter(lv) : lv as R
  }
}