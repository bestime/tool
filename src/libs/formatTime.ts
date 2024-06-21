import padStart from "./padStart"

function zeroWidthNum(data: number, count: number) {
  return padStart(data, count, '0')
}
export default function formatTime (millisecond: number) {
  const date = new Date(millisecond)
  const Y = date.getFullYear()
  const M = date.getMonth() + 1
  const D = date.getDate()
  const H = date.getHours()
  const m = date.getMinutes()
  const s = date.getSeconds()
  const S = date.getMilliseconds()

  return `${zeroWidthNum(Y ,4)}/${zeroWidthNum(M, 2)}/${zeroWidthNum(D, 2)} ${zeroWidthNum(H, 2)}:${zeroWidthNum(m,2)}:${zeroWidthNum(s, 2)}:${zeroWidthNum(S, 3)}`
}