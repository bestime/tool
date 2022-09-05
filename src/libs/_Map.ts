import isMap from "./isMap"
import jsonParse from './help/hpJsonParse'

export default function _Map (data: any): Record<string, any> {
  if(!isMap(data)) {
    data = jsonParse(data)
    if(!isMap(data)) {
      data = {}
    }
  }

  return data

}