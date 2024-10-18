
import { Map, VectorLayer, type VectorLayerOptionsType } from 'maptalks'
import { cloneDeep, merge } from 'lodash-es'
import requestStaticFile from '../requestStaticFile'
import { getPolygonLilst } from './libs'


interface ILayerBasicStyle {
  backgroundColor: string,
  lineColor: string,
  lineWidth: number,
  fontColor: string,
  fontSize: number,
  fontHaloFill: string,
  fontHaloRadius:number
}



export default class CityBoundry {
  _layer_01: VectorLayer
  _layer_02: VectorLayer
  _config: {
    backgroundLayerStyle: ILayerBasicStyle,
    frontLayerStyle: ILayerBasicStyle
  }

  constructor (id: string, options: VectorLayerOptionsType, style: {
    backgroundLayerStyle: Partial<ILayerBasicStyle>,
    frontLayerStyle: Partial<ILayerBasicStyle>
  }) {
    this._config = {
      backgroundLayerStyle: merge({
        backgroundColor: 'rgba(0,0,0,0.1)',
        lineColor: '#1a504e',
        lineWidth: 1,
        fontSize: 12,
        fontColor: '#66a1a3',
        fontHaloFill: 'black',
        fontHaloRadius:1
      }, style.backgroundLayerStyle),
      frontLayerStyle: merge({
        backgroundColor: '#013733',
        lineColor: '#1a504e',
        lineWidth: 1,
        fontColor: 'white',
        fontSize: 12,
        fontHaloFill: 'black',
        fontHaloRadius:1
      }, style.frontLayerStyle),
    }
    const cfg = merge({
      zIndex: 2,
      forceRenderOnMoving: true,
      forceRenderOnZooming: true,
      forceRenderOnRotating: true,
    }, options)
    const cfg2 = cloneDeep(cfg)
    cfg2.zIndex -= 1
    this._layer_01 = new VectorLayer(`${id}_station`, cfg)
    this._layer_02 = new VectorLayer(`${id}_background`, cfg2)
  }

  async setAreaCode (code: string) {
    const path = `/geos/${code}_full.json`
    await requestStaticFile(path).then(({ data }) => {
      const res = getPolygonLilst(data, this._config.frontLayerStyle)
      this._layer_01.clear()
      this._layer_01.addGeometry(res.polygons)
      this._layer_01.addGeometry(res.markers)
    })
  }

  async setBackgroundAreaCode (code: string) {
    const path = `/geos/${code}_full.json`
    await requestStaticFile(path).then(({ data }) => {
      const res = getPolygonLilst(data, this._config.backgroundLayerStyle)
      this._layer_02.clear()
      this._layer_02.addGeometry(res.polygons)
      this._layer_02.addGeometry(res.markers)
    })
  }

  addTo (map: Map) {
    this._layer_01.addTo(map)
    this._layer_02.addTo(map)
  }

  clear () {
    this._layer_01.clear()
    this._layer_02.clear()
  }

  dispose () {
    this._layer_01.clear().remove()
    this._layer_02.clear().remove()
  }
}