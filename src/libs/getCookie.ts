import { DECODE_URI_COMPONENT } from './constant'

export default function getCookie (key: string, target?: string): string {
  target = target || document.cookie
  let res: string = ''
  target.replace(new RegExp('(^|;\\s)' + key + '=(.*?)($|(;\\s))'), function (g: string, prefix: any, value: any) {
    res = DECODE_URI_COMPONENT(value)
    return ''
  })

  return res
}