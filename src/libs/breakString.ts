import trim from "./trim"

/**
 * 将字符串按指定长度变为一个数组
 * @param rowLength 
 * @param data 
 * @returns 
 */
export default function breakString (rowLength: number, data?: string) {
  const title = trim(data)
  const list: string[] = []  
  for(let index = 0; index<title.length; index+=rowLength) {
    list.push(title.substring(index, index+rowLength))
  }
  return list
}