import isKvPair from "./isKvPair"
import jsonParse from './help/hpJsonParse'

export default function KvPair (data: any): Record<string, any> {
  if(!isKvPair(data)) {
    data = jsonParse(data)
    if(!isKvPair(data)) {
      data = {}
    }
  }

  return data

}