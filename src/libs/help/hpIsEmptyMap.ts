export default function hpIsEmptyMap (data: {
  [key: string]: any
}) {
  var result = true
  for (var key in data) {
    if(key !== undefined) {
      result = false
    }
  }

  return result
}