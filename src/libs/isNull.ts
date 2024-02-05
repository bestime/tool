import { $undefinedValue } from "./help/hpConsts";

export default function isNull (data: any) {
  return data === null || data === $undefinedValue
}