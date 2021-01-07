import _Object from './_Object'
import { CONFIG_KEY } from './basic/constant'
import { WINDOW } from './basic/browser'


export default function setConfig (key, val) {
  WINDOW[CONFIG_KEY] = _Object(WINDOW[CONFIG_KEY])
  WINDOW[CONFIG_KEY][key] = val
}