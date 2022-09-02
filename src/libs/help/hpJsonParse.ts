export default function hpJsonParse(data: any): any[] | {[key: string]: any} | undefined {

  try { data = JSON.parse(data) } catch (e) {
    data = undefined
  }

  return data
}