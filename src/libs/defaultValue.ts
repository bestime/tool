import isNull from "./isNull"

export default function defaultValue<T> (data: any, value: T): T {
  return isNull(data) ? value : data
}