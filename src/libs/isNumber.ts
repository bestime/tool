export default function isNumber (data: any) {
  data = Number(data)
  let result = true
  if(isNaN(data)) {
    result = false
  } else if (Infinity == Math.abs(data)) {
    result = false
  }

  return result
}