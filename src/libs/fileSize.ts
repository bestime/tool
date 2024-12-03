import shortNumber from "./shortNumber";


type TSizeUnit = 'Byte' | 'KB'|'MB'|'GB'|'TB'
type TUnits = [number, TSizeUnit]

const u1 = 1
const u2 = 1024
const u3 = 1024 * 1024
const u4 = 1024 * 1024 * 1024
const u5 = 1024 * 1024 * 1024 * 1024
const units: TUnits[] = [
  [u1, 'Byte'],
  [u2, 'KB'],
  [u3, 'MB'],
  [u4, 'GB'],
  [u5, 'TB'],
]



export default function fileSizeFormatter (byte: number, formatter: (data: number) => string) {
  const res = shortNumber(byte, formatter, units)
  return {
    value: res.value,
    unit: res.unit,
    text: res.fmtValue
  }
}

export function fileSizeToNumber (data: number, unit: TSizeUnit) {
  const unitItem = units.find(c=>c[1] === unit)!
  return data * unitItem[0]
}