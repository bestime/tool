export default function defaultValue<T> (data: any, value: T): T {
  return data === undefined ? value : data
}