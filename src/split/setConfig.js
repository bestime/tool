import _Object from './_Object'
import { CONFIG_KEY } from './const'


export default function setConfig (key, val) {
  window[CONFIG_KEY] = _Object(window[CONFIG_KEY])
  window[CONFIG_KEY][key] = val
}