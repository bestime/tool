import { $decodeURIComponent } from './help/hpConsts'
import FN_FORMAT_STRING_VALUE from './help/hpTryToParseStringToBasicType'

export default function getCookie (key: string, target?: string): string {
  target = target || document.cookie
  let res: string = ''
  target.replace(new RegExp('(^|;\\s)' + key + '=(.*?)($|(;\\s))'), function (g,prefix, value):any {
    res = FN_FORMAT_STRING_VALUE($decodeURIComponent(value))
  })

  return res
}