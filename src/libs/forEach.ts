export default function forEach<T> (data: T[], callback: (item: T, index: number, array: T[]) => void): void {
  for(var index = 0; index < data.length; index++) {
    callback(data[index], index, data)
  }
}