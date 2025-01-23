import { variableHasValue } from '@bestime/utils_base'
import mapboxgl, { Map, MapMouseEvent } from "mapbox-gl";
import type { IEllipseItem, IExtentCoordinates, IGeoJson, ILineOption, IPipeLineOption, IPointOption, IPointZoomRule } from "./types";
import { getIconAndTextSizeWithZoom, getLineOpacity, getTypeColor} from "./common";
import loadImage, { type IMapImage } from "../loadImage";
import { ellipse } from '@turf/turf'
mapboxgl.accessToken = "没有付费token";

const layerConfig = {
  referImg: {
    source: 'cq-area-refer-img-source',
    layer: 'cq-area-refer-img-layer'
  },
  bgArea: {
    source: 'cq-area-source',
    layer: 'cq-area-border',
    bglayer: 'cq-area-bg',
  },
  bgTuoyuan: {
    source: 'cq-ty-source',
    textSource: 'cq-ty-textsource',
    lineLayer: 'cq-ty-line',
    textLayer: 'cq-ty-text',
    bglayer: 'cq-ty-bg',
  },
  pipeline: {
    source: 'cq-lines-source',
    layer: 'cq-lines-layer'
  },
  point: {
    source: 'cq-markers-source',
    layer: 'cq-markers-layer'
  }
}

export default class PipeLine {
  _map: Map
  _ready = false
  _state = {
    timer_01: -1,
    timer_02: -2,
    imgCacheGp: {} as Record<string ,any>
  }
  _markerData: IPointOption | undefined
  _lineData: ILineOption | undefined
  
  _config: IPipeLineOption
  constructor (config: IPipeLineOption) {

    this._onMarkerClick = this._onMarkerClick.bind(this)
    this._onMapLoad = this._onMapLoad.bind(this)
    this._onZoomed = this._onZoomed.bind(this)
    this._config = config

    const iMap = new mapboxgl.Map({
      container: config.container,
      projection: 'globe',
      attributionControl: false,
      style: {
        version: 8,
        // "glyphs": "mapbox://fonts/{fontstack}/{range}.pbf",
        // "glyphs": "https://fonts.openmaptiles.org/{fontstack}/{range}.pbf",
        "glyphs": config.staticSource.glyphs,
        sources: {},
        layers: [
          {
            id: "background",
            type: "background",
            layout: {
              visibility: "visible",
            },
            paint: {
              "background-color": config.style.backgroundColor ?? "white",
            },
          },
        ],
      },
      maxZoom: 11,
      minZoom: 7,
      center: [108.14, 30.19],
      zoom: 7,
      doubleClickZoom: false,
      pitch: 0,
    });

    this._map = iMap
    iMap.on('load', this._onMapLoad)
    if(this._config.onZoom) {
      iMap.on('zoom', this._onZoomed)
    }
    iMap.on('click', function (ev) {
      console.log("地图点击：", ev.lngLat)
    })
  }

  _waitLayerLoaded (layerId: string) {
    return new Promise((resolve: (v?: any) => void) => {
      variableHasValue(() => {
        return !!this._map.getLayer(layerId)
      }, resolve)
    })
  }

  _onZoomed () {
    const zoom = this._map.getZoom()

    // 延时一下，以免影响性能
    clearTimeout(this._state.timer_02)
    this._state.timer_02 = setTimeout(() => {
      this._updateLineAndMarkerCurrentZoom()
    }, 100)
    
    this._config.onZoom?.(zoom)    
  }

  // 这个方法主要时filter中的zoom只能到整数级别，所以为每个元素手动设置一个最新值
  _updateLineAndMarkerCurrentZoom () {
    
    const zoom = this._map.getZoom()
    if(this._lineData) {
      this._lineData.data.features.forEach(function (item) {
        item.properties.currentZoom = zoom
      })
      const source = this._map.getSource(layerConfig.pipeline.source)
      // @ts-ignore
      source && source.setData(this._lineData.data)
    }

    if(this._markerData) {
      this._markerData.data.features.forEach(function (item) {
        item.properties.currentZoom = zoom
      })
      const source = this._map.getSource(layerConfig.point.source)
      // @ts-ignore
      source && source.setData(this._markerData.data)
    }
  }

  async _onMapLoad () {
    const iMap = this._map
    this._map.setFog({})
    this._ready = true
    this._onZoomed()
    
    
    iMap.addSource(layerConfig.bgArea.source, {
      type: "geojson",
      data: this._config.staticSource.boundaryGeojson,
    });  

    this._map.addLayer({
      'id': layerConfig.bgArea.bglayer,
      'type': 'fill',
      'source': layerConfig.bgArea.source, // reference the data source
      'layout': {},
      'paint': {
          'fill-color': this._config.style.boundaryBackgroundColor ?? 'white', // blue color fill
          'fill-opacity': this._config.style.boundaryBackgroundOpacity ?? 1
      }
    });
    
    this._map.addLayer({
      id: layerConfig.bgArea.layer,
      type: "line",
      source: layerConfig.bgArea.source, // reference the data source
      layout: {},
      paint: {
        // "line-color": "black",
        // "line-width": 2,
        "line-color": this._config.style.boundaryBorderColor ?? 'black',
        "line-width": this._config.style.boundaryBorderWidth ?? 1,
      },
    });

    this._addRefreImg()
    
  }

  async _addRefreImg () {
    if(!this._config.referImage) return;
    
    console.log("添加底图",this._config.referImage)
    this._map.addSource(layerConfig.referImg.source, {
        'type': 'image',
        url: this._config.referImage.url,
        coordinates:this._config.referImage.coordinates
    });
    this._map.addLayer({
        id: layerConfig.referImg.layer,
        'type': 'raster',
        'source': layerConfig.referImg.source,
        'paint': {
          'raster-fade-duration': 500,
          'raster-opacity': 1
        }
    });
  }

  clearLines () {
    this._map.removeLayer(layerConfig.pipeline.layer)
    this._map.removeSource(layerConfig.pipeline.source)
    return this;
  }
  clearPoints () {
    this._map.removeLayer(layerConfig.point.layer)
    this._map.removeSource(layerConfig.point.source)
    return this;
  }
  
  async setLines (config: ILineOption) {
    config.data.features.forEach(function (item: any) {
      const ext = config.zoomRules.find(c=>c.id === item.properties.id)
      Object.assign(item.properties, {
        type: ext?.type ?? '-',
        lineWidth: 2,
        lineWidthPrev: 2,
        minZoom: ext?.zoom ?? 0,
        currentZoom: 0
      })
    })
    console.log("绘制线条", config)
    this._lineData = config
    await this._waitLayerLoaded(layerConfig.bgArea.layer)
    this._map.addSource(layerConfig.pipeline.source, {
      type: "geojson",
      data: config.data,
    });
    
    
    this._map.addLayer({
      id: layerConfig.pipeline.layer,
      type: "line",
      source: layerConfig.pipeline.source, // reference the data source
      layout: {},
      paint: {
        "line-color": getTypeColor(config.legends),
        "line-width": ["get", "lineWidth"]        
      },
      filter: ['>=', ['get','currentZoom'], ['get', 'minZoom']]
    });

    this._map.on('click', (e) => {   
      const features = this._topLayerClick(e, layerConfig.pipeline.layer)
      if(features.length) {
        const first: any = features[0]
        this._flickerLine(first.properties.id, true)
        this._config.onLineSelect?.(first.properties)
      }      
    })
  }

  

  _flickerLine (id: string, active: boolean) {
    clearTimeout(this._state.timer_01)
    if(!this._lineData) return;
    const source: any = this._map.getSource(layerConfig.pipeline.source)!
    
    if(!source) return;
    this._lineData.data.features.forEach((oLine) => {
      const readWidth = oLine.properties.lineWidthPrev;
      oLine.properties.lineWidth = oLine.properties.id === id && active ? readWidth * 4 : readWidth
      
    })
    source.setData(this._lineData.data)
    // this._state.timer_01 = setTimeout(() => {
    //   this._flickerLine(id, !active)
    // }, 500)
  }

  _topLayerClick (ev: MapMouseEvent, layerId: string) {
    const features = this._map.queryRenderedFeatures(ev.point);
    const firstLayerId = features[0]?.layer?.id
    if(layerId !== firstLayerId) {
      features.length = 0
    }
    return features
  }

  _onMarkerClick (e: MapMouseEvent) {
    const features = this._topLayerClick(e, layerConfig.point.layer)
      
    if(this._markerData && features.length) {
      const first = features[0]
      const rule = this._markerData.zoomRules.find(c=>c.id === first.properties?.id)
      this._config.onPointSelect?.(first.properties!, rule)
      
    }      
  }

  async setMarkers (config: IPointOption) {
    await this._waitLayerLoaded(layerConfig.pipeline.layer)
    const imgs: any[] = []
    config.data.features.forEach(function (c) {     
      let name = c.properties.icon
      if(!imgs.some(d => d.name === name)) {
        imgs.push({
          name: c.properties.icon,
          url: c.properties.icon
        })
      }      
    })
    
    const iconList = await loadImage(this._map, imgs, this._state.imgCacheGp)
    config.data.features.forEach(function (item) {
      const ext = config.zoomRules.find(c=>c.id === item.properties.id)
      Object.assign(item.properties, {
        minZoom: ext?.zoom ?? 0,
      })
    })
    console.log("绘制marker：", config)
    
    this._map.addSource(layerConfig.point.source, {
      type: "geojson",
      data: config.data,
    });

    const ttt = getIconAndTextSizeWithZoom(iconList, config)

    this._map.addLayer({
      id: layerConfig.point.layer,
      type: "symbol",
      source: layerConfig.point.source, // reference the data source
      paint: {
        'text-color': ['get', 'textColor'],
        'text-halo-color': ['get', 'textHaloColor'],
        'text-halo-blur': 0,  
        "text-halo-width": ['get', 'textHaloWidth']      
      },
      layout: {        
        'icon-allow-overlap': true,
        'text-allow-overlap': true,
        'icon-image': ['get', 'icon'],
        'icon-size': ttt.iconSize,
        // get the title name from the source's "title" property
        'text-field': ['get', 'title'],
        'text-size': ttt.textSize,
        'text-font': [
          'local-map',
        ],
        
        'text-offset': ttt.textOffset,
        'text-anchor': 'center'
      },
      filter: ['>=', ['get','currentZoom'], ['get', 'minZoom']]
    });
    this._markerData = config
    this._onZoomed()
    this._map.off('click', layerConfig.point.layer, this._onMarkerClick)
    this._map.on('click', layerConfig.point.layer, this._onMarkerClick)
  }

  /**
   * 绘制椭圆合集
   * @param data 
   */
  async setEllipse (data: IEllipseItem[]) {
    await this._waitLayerLoaded(layerConfig.bgArea.layer)
    const labelFeatures: any[] = []
    const ghps = data.map(function (item) {      
      var oEllipse = ellipse(item.center, item.xSemiAxis, item.ySemiAxis, {
        angle: item.angle,
        steps: item.steps
      });
      oEllipse.properties = Object.assign({}, oEllipse.properties, {
        borderWidth: item.borderWidth,
        backgroundColor: item.backgroundColor,
        borderColor: item.borderColor,        
      })
      labelFeatures.push({
        type:'Feature',
        properties: {
          title: `${item.title}\n${item.subTitle}`,
          color: item.textColor
        },
        geometry: {
          type: 'Point',
          coordinates: item.center
        }
      })
      return oEllipse
    })

    this._map.addSource(layerConfig.bgTuoyuan.source, {
      type: "geojson",
      data: {
        type: 'FeatureCollection',
        features: ghps
      },
    }); 
    this._map.addSource(layerConfig.bgTuoyuan.textSource, {
      type: "geojson",
      data: {
        type: 'FeatureCollection',
        features: labelFeatures
      },
    }); 

    console.log("椭圆44", ghps)
    this._map.addLayer({
      id: layerConfig.bgTuoyuan.lineLayer,
      type: "line",
      source: layerConfig.bgTuoyuan.source, // reference the data source
      layout: {},
      paint: {
        "line-color": ['get', 'borderColor'],
        "line-width": ['get', 'borderWidth']
      }
    });
    
    this._map.addLayer({
      'id': layerConfig.bgTuoyuan.bglayer,
      'type': 'fill',
      'source': layerConfig.bgTuoyuan.source, // reference the data source
      'layout': {},
      'paint': {
        'fill-color': ['get', 'backgroundColor']
      }
    });    

    this._map.addLayer({
      id: layerConfig.bgTuoyuan.textLayer,
      type: "symbol",
      source: layerConfig.bgTuoyuan.textSource, // reference the data source
      paint: {
        'text-color': ['get', 'color'],
        // 'text-halo-color': ['get', 'textHaloColor'],
        // 'text-halo-blur': 0,  
        // "text-halo-width": ['get', 'textHaloWidth']      
      },
      layout: {
        'icon-allow-overlap': true,
        'text-allow-overlap': true,
        // get the title name from the source's "title" property
        'text-field': ['get', 'title'],
        'text-size': [
          'interpolate',
          ['linear'],
          ['zoom'], 
          7, 8,
          8, 12,
          9, 30,
          10, 50,
          11, 80
        ],
        'text-font': [
          'local-map',
        ],
        'text-offset': [0,0],
        'text-anchor': 'center'
      }
    });
  }

  setReferExtent (value: IExtentCoordinates) {
    const source = this._map.getSource(layerConfig.referImg.source);
    // @ts-ignore
    source?.setCoordinates(value)
  }



  dispose () {
    this._state.imgCacheGp = {}
    this._map.off('click', layerConfig.point.layer, this._onMarkerClick)
    clearTimeout(this._state.timer_02)
    clearTimeout(this._state.timer_01)
    this._map.off('zoom', this._onZoomed)
    this._map.off('load', this._onMapLoad)
  }
  
}