
import { Map, VectorLayer, type VectorLayerOptionsType } from 'maptalks'
import { cloneDeep, debounce, merge } from 'lodash-es'
import requestStaticFile from '../requestStaticFile'
import { getPolygonLilst } from './libs'

import type { ILayerBasicStyle } from './libs'




export default class CityBoundry {
  _layer_01: VectorLayer
  _layer_02: VectorLayer
  map: Map | undefined
  _config: {
    backgroundLayerStyle: ILayerBasicStyle,
    frontLayerStyle: ILayerBasicStyle
  }
  _onZoomedHandler?: (data: any) => void

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
      const res = getPolygonLilst('front',data, this._config.frontLayerStyle)
      this._layer_01.clear()
      this._layer_01.addGeometry(res.polygons)
      this._layer_01.addGeometry(res.markers)
      this._deferDrawSubCity(data)
    })
  }

  async setBackgroundAreaCode (code: string) {
    const path = `/geos/${code}_full.json`
    await requestStaticFile(path).then(({ data }) => {
      const res = getPolygonLilst('background',data, this._config.backgroundLayerStyle)
      this._layer_02.clear()
      this._layer_02.addGeometry(res.polygons)
      this._layer_02.addGeometry(res.markers)
    })
  }

  async _deferDrawSubCity (parentGeoJson: Record<string, any>) {
    console.log("绘制", parentGeoJson)
    let item: any;

    this._layer_01.forEach(function (oGemotry) {
      if(oGemotry.properties.groupName === 'subFront') {
        oGemotry.remove()
      }
    })

    for(let index=0;index<parentGeoJson.features.length;index++) {
      item = parentGeoJson.features[index]
      const path = `/geos/${item.properties.adcode}_full.json`
      const { data } = await requestStaticFile(path)
      console.log("子集", data)
      const res = getPolygonLilst('subFront',data, this._config.frontLayerStyle)
      this._layer_01.addGeometry(res.polygons)
      this._layer_01.addGeometry(res.markers)
    }

  }


  _toggleShowSubCity (zoom?: number) {
    this._layer_01.forEach(function (item) {})
  }

  addTo (map: Map) {
    this.map = map
    this._layer_01.addTo(map)
    this._layer_02.addTo(map)

    if(!this._onZoomedHandler) {
      this._onZoomedHandler = debounce((ev) => {
        this._toggleShowSubCity(ev.to)
      }, 100)
    }

    this.map.on('zoomend', this._onZoomedHandler)
    this._toggleShowSubCity(map.getZoom())
  }

  clear () {
    this._layer_01.clear()
    this._layer_02.clear()
  }

  dispose () {
    if(this._onZoomedHandler) {
      this.map?.off('zoomend', this._onZoomedHandler)
      delete this._onZoomedHandler
    }
    this._layer_01.clear().remove()
    this._layer_02.clear().remove()
  }
}