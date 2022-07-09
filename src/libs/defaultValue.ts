export default function defaultValue<T> (data: T, value: any): T {
  return data === undefined ? value : data
}