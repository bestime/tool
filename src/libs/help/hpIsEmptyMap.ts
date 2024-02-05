import { $undefinedValue } from "./hpConsts";

export default function hpIsEmptyMap (data: {
  [key: string]: any
}) {
  var result = true
  for (var key in data) {
    if(key !== $undefinedValue) {
      result = false
      break;
    }
  }

  return result
}