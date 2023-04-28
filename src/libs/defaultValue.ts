import isNull from "./isNull"


/**
   * 默认值处理函数
   * @param data - 需要处理的数据
   * @param value - 如果data为undefined，则返回此值
   * @returns 实际值
   */
export default function defaultValue<T> (data: any, value: T): T {
  return isNull(data) ? value : data
}