import isArray from "./isArray"
import jsonParse from './help/jsonParse'





export default function _Array (data: any) {
  if(!isArray(data)) {
    data = jsonParse(data)
    if(!isArray(data)) {
      data = []
    }
  }
  return data
}