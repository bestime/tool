import type { TKvPair } from "./help/type-declare"

export default function union<T extends TKvPair> (...args: T[]) {
  const arr = new Set(args)
  return Array.from(arr)
}