export default function mapToArray (data) {
  const result = []
  for(let key in data) {
    result.push(data[key])
  }
  return result
}