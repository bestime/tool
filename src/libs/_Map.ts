import isMap from "./isMap"
import jsonParse from './help/jsonParse'

interface IMap {
  [key: string]: any
}

export default function _Map (data: any): IMap {
  if(!isMap(data)) {
    data = jsonParse(data)
    if(!isMap(data)) {
      data = {}
    }
  }

  return data

}