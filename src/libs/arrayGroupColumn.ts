/**
 * 将一维数组按几列分为二维数组
 * @param data 
 * @param column 
 */
export default function arrayGroupColumn<T> (data: T[], column: number) {
  const result: T[][] = []
  for(let index= 0;index<data.length; index+= column) {
    result.push(data.slice(index, index + column))
  }
  return result
}