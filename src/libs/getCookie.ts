import { DECODE_URI_COMPONENT } from './constant'
import FN_FORMAT_STRING_VALUE from './help/FN_FORMAT_STRING_VALUE'

export default function getCookie (key: string, target?: string): string {
  target = target || document.cookie
  let res: string = ''
  target.replace(new RegExp('(^|;\\s)' + key + '=(.*?)($|(;\\s))'), function (g,prefix, value):any {
    res = FN_FORMAT_STRING_VALUE(DECODE_URI_COMPONENT(value))
  })

  return res
}