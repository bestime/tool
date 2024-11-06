
import { Map, VectorLayer, type VectorLayerOptionsType } from 'maptalks'
import { cloneDeep, debounce, get, merge } from 'lodash-es'
import requestStaticFile from '../requestStaticFile'
import { getPolygonLilst } from './libs'

import type { ILayerBasicStyle } from './libs'
import { isNull } from '@bestime/utils_base'

type TAreaClickHandler = (data: {
  adcode?: number,
  name?: string
}) => void


export default class CityBoundry {
  _layer_01: VectorLayer
  _layer_02: VectorLayer
  map: Map | undefined
  _activeAreaCode = ''
  _activeHoverCode = ''
  
  _config: {
    onAreaClick?: TAreaClickHandler
    subAreaShowZoom: number
    backgroundLayerStyle: ILayerBasicStyle,
    frontLayerStyle: ILayerBasicStyle
  }
  _onZoomedHandler?: (data: any) => void

  constructor (id: string, options: VectorLayerOptionsType, ext: {
    subAreaShowZoom?: number
    onAreaClick: TAreaClickHandler,
    backgroundLayerStyle: Partial<ILayerBasicStyle>,
    frontLayerStyle: Partial<ILayerBasicStyle>
  }) {
    this._config = {
      onAreaClick: ext.onAreaClick,
      subAreaShowZoom: ext.subAreaShowZoom ?? 5,
      backgroundLayerStyle: merge({
        backgroundColor: 'rgba(0,0,0,0.1)',
        hoverBackgroundColor: 'red',
        lineColor: '#1a504e',
        lineWidth: 1,
        fontSize: 12,
        fontColor: '#66a1a3',
        fontHaloFill: 'black',
        fontHaloRadius:1
      }, ext.backgroundLayerStyle),
      frontLayerStyle: merge({
        backgroundColor: '#013733',
        hoverBackgroundColor: 'red',
        lineColor: '#1a504e',
        lineWidth: 1,
        fontColor: 'white',
        fontSize: 12,
        fontHaloFill: 'black',
        fontHaloRadius:1
      }, ext.frontLayerStyle),
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
      const sty = this._config.frontLayerStyle
      const res = getPolygonLilst('front',data, sty)
      this._layer_01.clear()
      if(this._config.frontLayerStyle.clickBackgroundColor) {
        
        res.polygons.forEach((oPl) => {
          oPl.on('mouseenter', () => {
            if(oPl.properties.isActive) return;
            this._setHoverAreaCode(oPl.properties.adcode, true)
          })
          oPl.on('mouseout', () => {
            if(oPl.properties.isActive) return;
            this._setHoverAreaCode(oPl.properties.adcode, false)
          })
          oPl.on('click', () => {
            if(oPl.properties.adcode === this._activeAreaCode) {
              this.setActiveFrontArecode('')
              this._config.onAreaClick?.({
                adcode: void 0,
                name: void 0,
              })
            } else {
              this.setActiveFrontArecode(oPl.properties.adcode)
              this._config.onAreaClick?.({
                adcode: oPl.properties.adcode,
                name: oPl.properties.name,
              })
            }
          })
        })
      }
      
      this._layer_01.addGeometry(res.polygons)
      this._layer_01.addGeometry(res.markers)
      this._deferDrawSubCity(data)
    })
    this._setHoverAreaCode(this._activeHoverCode, true)
    this.setActiveFrontArecode(this._activeAreaCode)
  }

  _setHoverAreaCode (code: string, isEnter: boolean) {
    const hoverColor = this._config.frontLayerStyle.hoverBackgroundColor
    if(!hoverColor) return;
    this._activeHoverCode = isEnter ? code : ''
    this._layer_01.forEach((oPoy) => {
      if(oPoy.type !== 'MultiPolygon') return;
      
      const isTarget = oPoy.properties.adcode === code || oPoy.properties.acroutes.includes(code)
      if(!isTarget) return;
      if(isEnter) {
        oPoy.properties.isHover = true
        oPoy.updateSymbol({
          polygonFill: hoverColor,
        })
      } else {
        oPoy.properties.isHover = false
        oPoy.updateSymbol({
          polygonFill: this._config.frontLayerStyle.backgroundColor,
        })
      }
    })
  }
  setActiveFrontArecode (code: string) {
    const clickColor = this._config.frontLayerStyle.clickBackgroundColor
    if(!clickColor) return;
    this._activeAreaCode = code
    this._layer_01.forEach((oPoy) => {
      if(oPoy.type !== 'MultiPolygon') return;
      
      const isActive = oPoy.properties.adcode === code || oPoy.properties.acroutes.includes(code)
      if(isActive) {
        oPoy.properties.isActive = true
        oPoy.updateSymbol({
          polygonFill: clickColor,
        })
      } else {
        oPoy.properties.isActive = false
        oPoy.updateSymbol({
          polygonFill: this._config.frontLayerStyle.backgroundColor,
        })
      }
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
      const res = getPolygonLilst('subFront',data, this._config.frontLayerStyle, true)
      this._layer_01.addGeometry(res.polygons)
      this._layer_01.addGeometry(res.markers)
    }
  }


  _toggleShowSubCity (zoom?: number) {
    this._layer_01.forEach((oGemotry) =>{
      if(oGemotry.properties.groupName === 'subFront') {
        if(zoom && zoom > this._config.subAreaShowZoom) {
          oGemotry.show()
        } else {
          oGemotry.hide()
        }
      }
    })
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