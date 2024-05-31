import isNull from "./isNull"

type TUnits = [number, string]

const defaUnits: TUnits[] = [
  [10000, '万'],
  [100000000, '亿'],
]

/**
 * 数字格式化为简称
 * @param data - 数字
 * @param formatter - 格式化数字（不包括单位）
 * @param units - 格式化规则，可自定义
 * @returns 数字简写
 */
export default function (data: number, formatter: (data: number) => string, units?: TUnits[]) {
  
  const ruleList = isNull(units) ? defaUnits : units
  ruleList.sort(function (a, b) {
    return b[0] - a[0]
  })

  let realData = data
  let realUnit = ''

  for(let a = 0; a < ruleList.length; a++) {
    const item = ruleList[a]
    
    const value = data / item[0]
    if(value >=1) {
      realData = value
      realUnit = item[1]
      break;
    }
  }

  return {
    value: realData,
    fmtValue: formatter(realData),
    unit: realUnit
  }
}