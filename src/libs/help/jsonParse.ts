export default function jsonParse(data: any) {
  try { data = JSON.parse(data) } catch (e) {}
  return data
}