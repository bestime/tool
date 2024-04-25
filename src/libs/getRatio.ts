export default function getRatio (value: number, base: number) {
  if(base === 0) {
    return 1
  } else if(value === 0) {
    return 0
  } else {
    return value / base
  }
}