export default function (data: any[]) {
  return Array.from(new Set(data))
}