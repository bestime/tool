import assign from './assign'
import getQuadraticBezierPath from './getQuadraticBezierPath'
import isObject from './isObject'
import dataReady from './dataReady'
const NAME = 'Bestime.MapboxPluginFlyPath'
import { removeLayer, removeImage, removeSource } from "./mapboxUtils"

let turfInject

export default function MapboxPluginFlyPath (id, map, turfLibrary, options) {
  var errorMessage
  if(!isObject(options)) {
    errorMessage = '配置项格式错误'
  } else if(!options.iconPath){
    errorMessage = '必须传入图片'
  }

  if(errorMessage) {
    throw  Error(NAME + '警告：' + errorMessage)
  }

  
  turfInject = turfLibrary

  this.options = assign({
    step: 500, // 每次移动距离米
    curveness: 1, //贝塞尔弧度
    lineColor: 'rgba(0,0,0,0.6)', // 路径颜色
    lineWidth: 4, // 路径宽度
    iconScale: 1, // 图标缩放
    lineDashArray: [1, 0], // 虚线配置
    iconPath: '', // 飞行图片链接
  }, options)
  

  map.loadImage(this.options.iconPath, (err, v) => {
    if(v) {
      
      map.addImage(this.options.iconPath, v)
      this._iconReady = true
    }
    
  })

  
  this._source_id_point = NAME+'-source-point-'+id
  this._layer_id_pint = NAME+'-layer-point-'+id

  this._layer_id_path = NAME+"-layer-path-"+id
  this._source_id_path = NAME+"-source-path-"+id
  
  this.map = map
  this._timer = null
  this._isMounted = true
  this._distance = 0
  this._lineCache = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          color: 'blue',
        },
        geometry: {
          type: "LineString",
  
          coordinates: [],
        },
      }
    ],
  }
  

  


  

  map.addSource(this._source_id_path, {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [],
    },
  })

  map.addLayer({
    id: this._layer_id_path,
    source: this._source_id_path,
    type: "line",
    paint: {
      "line-width": this.options.lineWidth,
      "line-color": this.options.lineColor,
      "line-dasharray": this.options.lineDashArray,
    },
  })

  map.addSource(this._source_id_point, {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [],
    },
  })

  map.addLayer({
    id: this._layer_id_pint,
    source: this._source_id_point,
    type: "symbol",
    layout: {
      "icon-size": this.options.iconScale,
      "icon-image": this.options.iconPath,
      "icon-rotate": ["get", "bearing"],
      "icon-rotation-alignment": "map",
      "icon-allow-overlap": true,
      "icon-ignore-placement": true,
    },
  })  
}

MapboxPluginFlyPath.prototype._addLlinePoint = function (coordinate) {
  this._lineCache.features[0].geometry.coordinates.push(coordinate)

  
  this.map.getSource(this._source_id_path).setData(this._lineCache)
}

MapboxPluginFlyPath.prototype._twoPoint = function (isBeginPoint, start, end, callback) {
  const route = {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [
        start,
        end
      ],
    },
  }

  
  // 总长度
  const lineDistance = turfInject.lineDistance(route, {
    units: 'meters'
  })

  clearInterval(this._timer)
  let _distance = 0;
  let _prePoint = start



  this._timer = setInterval(() => {
    var coordinates = turfInject.along(route, _distance, {
      units: 'meters'
    }).geometry.coordinates

    if(_distance===0) {
      coordinates = start
    } else if(_distance>=lineDistance) {
      _distance = lineDistance
      clearInterval(this._timer)
      coordinates = end
    } else if(this.options.curveness !== 0){
      coordinates = getQuadraticBezierPath(
        start,
        end,
        this.options.curveness,
        _distance/lineDistance
      )      
    }



    // 后面的点不绘制第一个点
    if(isBeginPoint || _distance!==0 || lineDistance===0) {      
      var bearing = turfInject.bearing(
        turfInject.point(_prePoint),
        turfInject.point(coordinates)
      )
  
      this._addLlinePoint(coordinates)


      
  
      this.map.getSource(this._source_id_point).setData({
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {
              bearing: bearing,
            },
            geometry: {
              type: "Point",
              coordinates,
            },
          }
        ]
      })

      
    }

    _prePoint = coordinates

    
    var percent = _distance / lineDistance
    if(isNaN(percent)) {
      percent = 1
    }

    callback(coordinates, percent)
    _distance += this.options.step
    
  }, 17)
}

MapboxPluginFlyPath.prototype.clear = function () {
  clearInterval(this._timer)
  this._lineCache.features[0].geometry.coordinates = []
  this.map.getSource(this._source_id_path).setData(this._lineCache)
  this.map.getSource(this._source_id_point).setData({
    type: "FeatureCollection",
    features: []
  })
}

MapboxPluginFlyPath.prototype.dispose = function () {
  clearInterval(this._timer)
  this.clear()
  this._isMounted = false
  removeLayer(this.map, this._layer_id_path)
  removeLayer(this.map, this._layer_id_pint)
  removeSource(this.map, this._source_id_point)
  removeSource(this.map, this._source_id_path)
  removeImage(this.map, this.options.iconPath)
}


MapboxPluginFlyPath.prototype.play = function (list, callback) {
  var self = this
  var endIndex = -1
  this.clear()
  
  dataReady(function () {
    if(self._iconReady) {
      ;(function loopPlay (index) {
    
        if(index<list.length-1 && self._isMounted) {
          endIndex = index + 1
          
          self._twoPoint(index===0, list[index], list[endIndex], function (current, percent) {
            
            var idEnd = percent === 1 && endIndex===list.length-1
            callback && callback(current, percent, idEnd)
            if(percent===1) {
              loopPlay(endIndex)
            }
            // 
          })
        }
      })(0);
      return true;
    } else {
      return false;
    }
  })

  

}