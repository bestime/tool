import trim from "./trim"

export default function breakString (rowLength: number, data?: string) {
  const title = trim(data)
  const list: string[] = []  
  for(let index = 0; index<title.length; index+=rowLength) {
    list.push(title.substring(index, index+rowLength))
  }
  return list
}