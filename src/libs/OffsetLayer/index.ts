import { _Number, isArray, isNull, roundFixed, trim } from "@bestime/utils_base";
import { cloneDeep, merge } from "lodash-es";
import { VectorLayer } from "maptalks";
import type { VectorLayerOptionsType, Geometry, Map, addGeometryFitViewOptions, Marker } from "maptalks";

function sortOneGroupAndClear (data: Record<string, TOffsetStyleMemberItem[]>) {
  for(let key in data) {
    if(data[key].length === 0) {
      delete data[key]
      continue;
    }
    data[key].sort(function (a, b) {
      return b.zoom - a.zoom
    })
  }
}

function hasSetV (data: string) {
  data = trim(data)
  if(data !== 'undefined' && data !== '') {
    return _Number(data)
  } else {
    return ;
  }
}

function getEditStyle (list: TOffsetStyleMemberItem[],data: TOffsetStyleMergeItem) {
  
  const zoom = hasSetV(data.zoom)
  const textOpacity = hasSetV(data.textOpacity)
  
  const textOffset: any = [hasSetV(data.textOffset[0]), hasSetV(data.textOffset[1])]
  
  const textSize = hasSetV(data.textSize)
  const iconSize = hasSetV(data.iconSize)
  const iconOpacity = hasSetV(data.iconOpacity)
 
  if(
    isNull(zoom)
    && isNull(textOpacity)
    && isNull(textOffset[0])
    && isNull(textOffset[1])
    && isNull(textSize)
    && isNull(iconSize)
    && isNull(iconOpacity)
  ) {
    // 删除原有的
    for(let a = 0;a<list.length;a++) {
      if(list[a]?.zoom === data.oldZoom) {
        list.splice(a--, 1)
      }
    }
  } else if(zoom){
    const old = list.find(function (c) {
      return c.zoom === zoom
    })
    const pxKong =isNull(textOffset[0]) && isNull(textOffset[1] )
    const x:TOffsetStyleMemberItem = {
      zoom: zoom,
      textOpacity,
      textOffset: pxKong ? void 0 : textOffset.map(function (v: any) {
        return _Number(v)
      }),
      textSize,
      iconSize,
      iconOpacity
    }
    if(old) {
      merge(old, x)
    } else {
      list.push(x)
    }
  } 
}

function toInputValue (data?: string | number) {
  if(data === 'undefined' || isNull(data)) {
    return ''
  } else {
    return data
  }
}

function createEditorHTML (instance:OffsetLayer, currentZoom: number,el: HTMLDivElement, config: {
  parent: ReturnType<typeof getOneConfig>,
  self: ReturnType<typeof getOneConfig>,
}, onSave: (memember: TOffsetStyleMergeItem, group: TOffsetStyleMergeItem) => void) {

  const { parent,self } = cloneDeep(config)
  let oldSelfZoom = self.style?.zoom
  let oldParentZoom = self.style?.zoom 
  const editHtml = document.createElement('div')
  editHtml.className="ckckljkjls"


  
  el.innerHTML = `
    <div class="current-zoom">
      <b>当前等级：${currentZoom}</b>
      <span>注：如果文字颜色的透明度只有颜色为</span>
      <span>十六进制时有效 #dd4215</span>
    </div>
    <div class="form"></div>
    <div class="btn-list">
      <button class="save">保存</button>
      <button class="back">还原</button>
      <button class="exportConfig">导出配置</button>
    </div>
  `
  
  function restForm () {
    el.querySelector('.form')!.innerHTML = `
      <ul>
        <li is-disable>
          <b>所属分组</b>
          <span>${parent.id}</span>
        </li>
        <li is-disable>
          <b>操作等级</b>
          <span class="opz01">${toInputValue(oldParentZoom)}</span>
        </li>
        <li>
          <b>配置等级</b>
          <input value="${toInputValue(parent.style?.zoom)}"/>
        </li>
        <li>
          <b>字体大小</b>
          <input value="${toInputValue(parent.style?.textSize)}"/>
        </li>
        
        <li>
          <b>字体偏移</b>
          <input value="${toInputValue(parent.style?.textOffset?.[0])}"/>
          <input value="${toInputValue(parent.style?.textOffset?.[1])}"/>
        </li>
        <li>
          <b>字体透明度</b>
          <input value="${toInputValue(parent.style?.textOpacity)}"/>
        </li>
        <li>
          <b>图标尺寸</b>
          <input value="${toInputValue(parent.style?.iconSize)}"/>
        </li>
        <li>
          <b>图标透明度</b>
          <input value="${toInputValue(parent.style?.iconOpacity)}"/>
        </li>
      </ul>
      <ul>
        <li>
          <b>所属分组</b>
          <span>${self.id}</span>
        </li>
        <li is-disable>
          <b>操作等级</b>
          <span class="opz02">${toInputValue(oldSelfZoom)}</span>
        </li>
        <li>
          <b>配置等级</b>
          <input value="${toInputValue(self.style?.zoom)}"/>
        </li>
        <li>
          <b>字体大小</b>
          <input value="${toInputValue(self.style?.textSize)}"/>
        </li>
        <li>
          <b>字体偏移</b>
          <input value="${toInputValue(self.style?.textOffset?.[0])}"/>
          <input value="${toInputValue(self.style?.textOffset?.[1])}"/>
        </li>
        <li>
          <b>字体透明度</b>
          <input value="${toInputValue(self.style?.textOpacity)}"/>
        </li>
        <li>
          <b>图标尺寸</b>
          <input value="${toInputValue(self.style?.iconSize)}"/>
        </li>
        <li>
          <b>图标透明度</b>
          <input value="${toInputValue(self.style?.iconOpacity)}"/>
        </li>
      </ul>
    `
  }


  restForm()

  function save () {
    const oList = el.querySelectorAll('input')
    const parentStyle:TOffsetStyleMergeItem = {
      oldZoom: oldParentZoom,
      zoom: oList[0].value,
      textSize: oList[1].value,
      textOffset: [oList[2].value, oList[3].value],
      textOpacity: oList[4].value,
      iconSize: oList[5].value,
      iconOpacity: oList[6].value,
    }
    const selfStyle:TOffsetStyleMergeItem = {
      oldZoom: oldSelfZoom,
      zoom: oList[7].value,
      textSize: oList[8].value,
      textOffset: [oList[9].value, oList[10].value],
      textOpacity: oList[11].value,
      iconSize: oList[12].value,
      iconOpacity: oList[13].value,
    }
    oldSelfZoom = +selfStyle.zoom || void 0
    oldParentZoom = +parentStyle.zoom || void 0
    el.querySelector('.opz01')!.innerHTML = `${oldParentZoom ?? ''}`
    el.querySelector('.opz02')!.innerHTML = `${oldSelfZoom ?? ''}`
    onSave(selfStyle, parentStyle)
  }
  
  el.querySelector<HTMLDivElement>('.back')!.onclick = function () {
    
    restForm()
    save()
  }
  el.querySelector<HTMLDivElement>('.save')!.onclick = save
  el.querySelector<HTMLDivElement>('.exportConfig')!.onclick = function () {
    console.log("复制此配置保存 => ", JSON.stringify(instance._offsetStyle))
  }
}
interface TOffsetStyleMergeItem {
  oldZoom?: number
  zoom: string,
  textOpacity: string
  textOffset: [string, string]
  textSize: string
  iconSize: string
  iconOpacity: string
}

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
    symbol.textDx = ext.textOffset[0]
    symbol.textDy = ext.textOffset[1]
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
      return currentZoom >= c.zoom
    })
  }
  return {
    id,
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
  _editMarker: Marker | undefined
  _editorContainer: HTMLDivElement | undefined
  
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
    if(this._editMarker) {
      this.editOffset(this._editMarker)
    }    
    this._debHandlerResize()
  }

  _getConfig (Ogeometry: Geometry, currentZoom: number, showGroupIds: string[]) {
      const mememberId = Ogeometry.properties?.offsetMemberId      
      const groupId = Ogeometry.properties?.offsetMemberGroupId      
      if(isNull(mememberId)) return;

      

      const cfgItem = getOneConfig(this._offsetStyle!.memember, mememberId as string, currentZoom)
      const gpConfig = getOneConfig(this._offsetStyle!.group, groupId as string, currentZoom)

      const isGroupSelected = !gpConfig.hasRule || (gpConfig.hasRule && gpConfig.style)
      if(isGroupSelected && !showGroupIds.includes(groupId)) {
        showGroupIds.push(groupId)
      }
       
      const realConfig = cloneDeep(cfgItem)
      if(gpConfig.hasRule) {
        realConfig.hasRule = gpConfig.hasRule
        if(gpConfig.style) {
          // 子集
          if(cfgItem.hasRule && !cfgItem.style) {
            realConfig.style = void 0
          } else {
            realConfig.style = merge({}, gpConfig.style, realConfig.style)
          }
        } else {
          realConfig.style = void 0
        }        
      }
      
      if(!realConfig.hasRule) return;
      return {
        parent: gpConfig,
        self: cfgItem,
        current: realConfig
      }
  }

  _onReszie () {
    if(!this._offsetStyle) return;
    const currentZoom = this.getMap().getZoom()
    const showGroupIds: string[] = []
    this.forEach((Ogeometry) => {
      const mememberId = Ogeometry.properties?.offsetMemberId     
      if(!this._showIds.includes(mememberId)) {        
        Ogeometry.hide();
        return 
      } 
      
      const realConfig = this._getConfig(Ogeometry, currentZoom,showGroupIds)
      // 无配置
      if(!realConfig) return Ogeometry.show();
      
      // 有配置，但是没有对次层级配置样式，表示隐藏 
      if(!realConfig.current.style) {
        return Ogeometry.hide();
      }    

      const oldSymbol = Ogeometry.getSymbol()

      if(oldSymbol) {
        if(isArray(oldSymbol)) {
          oldSymbol.forEach(function (item) {
            if(item.textSize) {
              updateTextSymbol(item, realConfig.current.style!)
            } else if(item.markerFile) {
              updateIconSymbol(item, realConfig.current.style!)
            }
          })
        } else {
          if(oldSymbol.textSize) {
            updateTextSymbol(oldSymbol, realConfig.current.style!)
          } else if(oldSymbol.markerFile) {
            updateIconSymbol(oldSymbol, realConfig.current.style!)
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
      sortOneGroupAndClear(data.group)
      sortOneGroupAndClear(data.memember)
    }
    this._offsetStyle = data
    this._debHandlerResize()
    return this;
  }

  editOffset (marker: Marker) {    
    const zoom = +roundFixed(this.getMap().getZoom(), 1)
    const selfId = marker.properties?.offsetMemberId      
    const groupId = marker.properties?.offsetMemberGroupId
    const config = this._getConfig(marker,zoom, []) ?? {
      flag: '自定义',
      parent: {
        hasRule: false,
        id: groupId
      },
      self: {
        hasRule: false,
        id: selfId
      }
    }
    if(!this._editorContainer) {
      this._editorContainer = document.createElement('div')
      this._editorContainer.className = 'maptalks-offset-layer-tool'
      
      document.body.appendChild(this._editorContainer)
    }
    this._editMarker = marker
    createEditorHTML(this, zoom, this._editorContainer, config as any, (a, b) => {
      if(!this._offsetStyle) return;
      
      this._offsetStyle.group[groupId] = this._offsetStyle.group[groupId] ?? []
      this._offsetStyle.memember[selfId] = this._offsetStyle.memember[selfId] ?? []
      
      
      getEditStyle(this._offsetStyle.group[groupId], b)
      getEditStyle(this._offsetStyle.memember[selfId], a)
      
      this.setOffsetStyle(this._offsetStyle)
    })
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
    this._editorContainer?.remove()
    clearTimeout(this._timer01)
    super.remove()
    this.getMap()?.off('zoomend', this._onZoomed);
    return this;
  }
  
}