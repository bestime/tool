import isNull from "./isNull"

export default function getRatio (value: number | undefined, base: number | undefined) {
  if(value === 0 || isNull(value)) {
    return 0
  } else if(base === 0 || isNull(base)) {
    return 1
  }  else {
    return value / base
  }
}

