export default function isEmptyMap (data: {
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