

export { default as BorderLayer } from './libs/BorderLayer'
export { default as CityBoundry } from './libs/CityBoundry/index'
export { default as OffsetLayer } from './libs/OffsetLayer/index'
export { default as HeartbeatLineString } from './libs/HeartbeatLineString'
import { setBaseUrl } from './libs/staticBaeUrl'




export default function (staticBaseUrl: string) {
  setBaseUrl(staticBaseUrl)
}