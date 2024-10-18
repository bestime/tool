import { _Number, isArray, isNull } from "@bestime/utils_base";
import { cloneDeep, merge } from "lodash-es";
import { VectorLayer } from "maptalks";
import type { VectorLayerOptionsType, Geometry, Map, addGeometryFitViewOptions } from "maptalks";




interface TOffsetStyleMemberItem{
  zoom: number,
  textOpacity?: number
  textOffset?: [number, number]
  textSize?: number
  iconSize?: number
  iconOpacity?: number
}

type TOffsetStyleMap = {
  /** 分组配置，（此配置的显示隐藏优先级大于member） */
  group: Record<string, TOffsetStyleMemberItem[]>
  /** 成员精细配置 */
  memember: Record<string, TOffsetStyleMemberItem[]>,
}

function updateTextSymbol (symbol: any, ext: TOffsetStyleMemberItem) {
  if(!symbol._cache) {
    symbol._cache = {
      textDx: _Number(symbol.textDx),
      textDy: _Number(symbol.textDy),
      textOpacity: _Number(symbol.textOpacity),
      textSize: _Number(symbol.textSize),
    }
  }
  
  if(isNull(ext.textOpacity)) {
    symbol.textOpacity = symbol._cache.textOpacity
  } else {
    symbol.textOpacity = ext.textOpacity
  }
  if(isNull(ext.textSize)) {
    symbol.textSize = symbol._cache.textSize
  } else {
    symbol.textSize = ext.textSize
  }
  

  if(isNull(ext.textOffset)) {
    symbol.textDx = symbol._cache.textDx
    symbol.textDy = symbol._cache.textDy
  } else {
    symbol.textDx = symbol._cache.textDx + ext.textOffset[0]
    symbol.textDy = symbol._cache.textDy + ext.textOffset[1]
  }
  
}
function updateIconSymbol (symbol: any, ext: TOffsetStyleMemberItem) {
  if(!symbol._cache) {
    symbol._cache = {
      markerWidth: _Number(symbol.markerWidth),
      markerHeight: _Number(symbol.markerHeight),
      markerOpacity: _Number(symbol.markerOpacity)
    }
  }
  
  if(isNull(ext.iconSize)) {
    symbol.markerWidth = symbol._cache.markerWidth
    symbol.markerHeight = symbol._cache.markerHeight
  } else {
    symbol.markerWidth = ext.iconSize
    symbol.markerHeight = ext.iconSize
  }

  if(isNull(ext.iconOpacity)) {
    symbol.markerOpacity = symbol._cache.markerOpacity
  } else {
    symbol.markerOpacity = ext.iconOpacity  
  }

  
    
}




function getOneConfig (config: Record<string, TOffsetStyleMemberItem[]>, id: string, currentZoom: number) {
  const list = config[id]
  let style: TOffsetStyleMemberItem | undefined
  let hasRule = false
  if(isNull(list?.length)) {
    hasRule = false
  } else {
    hasRule = true
    style = list.find(function (c) {
      return currentZoom > c.zoom
    })
  }
  return {
    hasRule,
    style
  }
}



interface IOffsetLayerExtConfig {
  onGroupVisibleChange: (ids: string[]) => void
}

/**
 * 缩放时，根据配置调整元素的位移、是否显示、大小等操作
 * 轻微绘制在此图层的元素，配置两个属性
 * 请使用这个图层的开发者，不要直接操作其中元素的show()、hide()
 * properties.offsetMemberId {boolean}用于精确定位到此元素（请保证此ID在此图层唯一）
 * properties.offsetMemberGroupId {?string}数据那个分组，自身的显示隐藏低于分组中的设置
 */
export default class OffsetLayer extends VectorLayer {
  _offsetStyle: TOffsetStyleMap | undefined
  _showIds: string[] = []
  _config: IOffsetLayerExtConfig
  _timer01:any
  
  constructor (id: string, geometries: VectorLayerOptionsType | Array<Geometry>, options: VectorLayerOptionsType, config: IOffsetLayerExtConfig) {
    super(id, geometries, options)
    this._config = config
    this._onZoomed = this._onZoomed.bind(this)
  }


  _debHandlerResize () {
    clearTimeout(this._timer01)
    this._timer01 = setTimeout(() => {
      this._onReszie()
    }, 100)
  }

  _onZoomed () {
    this._debHandlerResize()
  }

  _onReszie () {
    // console.log("重新计算显示隐藏", this._offsetStyle, this)
    if(!this._offsetStyle) return;
    const currentZoom = this.getMap().getZoom()
    const showGroupIds: string[] = []
    this.forEach((Ogeometry) => {
      const mode = Ogeometry.properties?.offsetMemberId      
      const groupId = Ogeometry.properties?.offsetMemberGroupId      
      if(isNull(mode)) return;

      const cfgItem = getOneConfig(this._offsetStyle!.memember, mode as string, currentZoom)
      const gpConfig = getOneConfig(this._offsetStyle!.group, groupId as string, currentZoom)

      const isGroupSelected = !gpConfig.hasRule || (gpConfig.hasRule && gpConfig.style)
      if(isGroupSelected && !showGroupIds.includes(groupId)) {
        showGroupIds.push(groupId)
      }
      if(!this._showIds.includes(mode)) {        
        return Ogeometry.hide();
      } else {        
        Ogeometry.show()
      }   
      const realConfig = cloneDeep(cfgItem)
      if(gpConfig.hasRule) {
        realConfig.hasRule = gpConfig.hasRule
        if(gpConfig.style) {
          // 子集
          if(cfgItem.hasRule && !cfgItem.style) {
            realConfig.style = void 0
          } else {
            realConfig.style = merge({}, gpConfig.style, cfgItem.style)
          }
        } else {
          realConfig.style = void 0
        }        
      }
      
      if(!realConfig.hasRule) return;
      
      const oldSymbol = Ogeometry.getSymbol()
      // console.log("找到配置",groupId, mode, gpConfig, cfgItem, realConfig)
      if(!realConfig.style) {
        return Ogeometry.hide();
      }

      if(!realConfig.style) {
        return Ogeometry.hide();
      }      

      if(oldSymbol) {
        if(isArray(oldSymbol)) {
          oldSymbol.forEach(function (item) {
            if(item.textSize) {
              updateTextSymbol(item, realConfig.style!)
            } else if(item.markerFile) {
              updateIconSymbol(item, realConfig.style!)
            }
          })
        } else {
          if(oldSymbol.textSize) {
            updateTextSymbol(oldSymbol, realConfig.style!)
          } else if(oldSymbol.markerFile) {
            updateIconSymbol(oldSymbol, realConfig.style!)
          }
        }
        Ogeometry.updateSymbol(oldSymbol)
      }
      Ogeometry.show()
    })

    this._config.onGroupVisibleChange(showGroupIds)
  }

  setActiveMememberIds (data: string[]) {
    this._showIds = data
    this._debHandlerResize()
  }

  /**
   * 键值对数据
   * 键表示元素：properties.offsetMemberId
   */
  setOffsetStyle (data?: TOffsetStyleMap) {
    // 按层级倒序
    if(data) {
      for(let key in data.memember) {
        data.memember[key].sort(function (a, b) {
          return b.zoom - a.zoom
        })
      }
    }
    
    this._offsetStyle = data
    this._debHandlerResize()
    return this;
  }

  addGeometry(geometries: Geometry | Array<Geometry>, fitView?: boolean | addGeometryFitViewOptions) {
    super.addGeometry(geometries, fitView)
    this._debHandlerResize()
  }

  onAdd(): void {
    super.onAdd()
    this._debHandlerResize()
  }

  addTo(map: Map) {
    super.addTo(map)
    map.on('zoomend', this._onZoomed)
    return this;
  }

  clear(): this {
    clearTimeout(this._timer01)
    super.clear()
    return this;
  }

  remove() {
    clearTimeout(this._timer01)
    super.remove()
    this.getMap()?.off('zoomend', this._onZoomed);
    return this;
  }
  
}