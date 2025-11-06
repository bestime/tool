
import "./index.scss"
export { default as BorderLayer } from './libs/BorderLayer'
export { default as CityBoundry } from './libs/CityBoundry/index'
export { default as OffsetLayer } from './libs/OffsetLayer/index'
export { default as HeartbeatMultiLineString } from './libs/HeartbeatMultiLineString'
export { default as MaptalksPluginFlyPath } from './libs/MaptalksPluginFlyPath'
import { setBaseUrl } from './libs/staticBaeUrl'




export default function (staticBaseUrl: string) {
  setBaseUrl(staticBaseUrl)
}