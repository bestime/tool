import _Object from './_Object'
import { CONFIG_KEY } from './const'

export default function getConfig (key) {
  var res = _Object(window[CONFIG_KEY])
  return key ? res[key] : res
}