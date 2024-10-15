
import { Map, VectorLayer } from 'maptalks'
import { merge } from 'lodash-es'
import requestStaticFile from '../requestStaticFile'
import { getPolygonLilst } from './libs'

interface IOptions {
  zIndex: number
}


export default class CityBoundry {
  _layer: VectorLayer

  constructor (id: string, options?: Partial<IOptions>) {
    const cfg = merge({
      zIndex: 1,
      forceRenderOnMoving: true,
      forceRenderOnZooming: true,
      forceRenderOnRotating: true,
    }, options)
    this._layer = new VectorLayer(id, cfg)
  }

  async setAreaCode (code: string) {
    const path = `/geos/${code}_full.json`
    await requestStaticFile(path).then(({ data }) => {
      const pons = getPolygonLilst(data)
      this._layer.clear()
      this._layer.addGeometry(pons)
    })
  }

  addTo (map: Map) {
    this._layer.addTo(map)
  }

  clear () {
    this._layer.clear()
  }

  dispose () {
    this._layer.clear().remove()
  }
}