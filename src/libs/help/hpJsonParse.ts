export default function hpJsonParse(data: string, defualtData?: any): any[] | Record<string, any> | undefined {

  let res: any;
  try { res = JSON.parse(data) } catch (e) {
    res = defualtData
  }

  return res
}