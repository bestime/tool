export default function hpJsonParse(data: string, defualtData?: any): any[] | Record<string, any> | undefined {

  try { data = JSON.parse(data) } catch (e) {
    data = defualtData
  }

  return defualtData
}