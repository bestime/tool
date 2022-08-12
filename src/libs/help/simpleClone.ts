import jsonParse from "./jsonParse"

export default function (data: any) {
  data = JSON.stringify(data)
  data = jsonParse(data)
  return data
}