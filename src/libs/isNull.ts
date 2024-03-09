import { $undefinedValue } from "./help/hpConsts";

type TNull = undefined | null | ''

export default function isNull (data: any): data is TNull{
  return data === null || data === $undefinedValue
}