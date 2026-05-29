import type { TKvPair } from "./type-declare";

export default function hpObjectKeys (data: TKvPair) {
  return Object.keys(data)
}