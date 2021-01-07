import _Object from './_Object'
import { CONFIG_KEY } from './basic/constant'
import { WINDOW } from './basic/browser'

export default function getConfig (key) {
  var res = _Object(WINDOW[CONFIG_KEY])
  return key ? res[key] : res
}