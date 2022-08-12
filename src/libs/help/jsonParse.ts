export default function jsonParse(data: any): any[] | {[key: string]: any} | undefined {

  try { data = JSON.parse(data) } catch (e) {
    data = undefined
  }

  return data
}