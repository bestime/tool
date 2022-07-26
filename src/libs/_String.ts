import isNull from './isNull'

export default function _String (data: any): string {
  return isNull(data) ? '' : String(data)
}