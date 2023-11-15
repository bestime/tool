import { $browserGlobal } from "./help/hpConsts";

const agent = $browserGlobal.navigator.userAgent



export default {
  isChrome: /Chrome/.test(agent),
  isIPhone: /iPhone/.test(agent)
}