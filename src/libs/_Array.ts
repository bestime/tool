import isArray from "./isArray"
import jsonParse from './help/hpJsonParse'





export default function _Array<T> (data: any): T[] {
  if(!isArray(data)) {
    data = jsonParse(data)
    if(!isArray(data)) {
      data = []
    }
  }
  return data
}