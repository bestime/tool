import { $decodeURIComponent } from './help/hpConsts'



/**
   * @param key - 获取的键
   * @param target - 来源，默认document.cookie
   * @returns 保存的值
   */
export default function getCookie (key: string, target?: string): string {
  target = target || document.cookie
  let res: string = ''
  target.replace(new RegExp('(^|;\\s)' + key + '=(.*?)($|(;\\s))'), function (g,prefix, value):any {
    res = $decodeURIComponent(value)
  })

  return res
}