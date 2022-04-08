/**
 * 绘制一条曲线路径
 * @param  {Object} ctx canvas渲染上下文
 * @param  {Array<number>} start 起点
 * @param  {Array<number>} end 终点
 * @param  {number} curveness 曲度(0-1)
 * @param  {number} percent 绘制百分比(0-100)
 */
 function drawCurvePath( start, end, curveness, percent ) {

  var cp = [
       ( start[ 0 ] + end[ 0 ] ) / 2 - ( start[ 1 ] - end[ 1 ] ) * curveness,
       ( start[ 1 ] + end[ 1 ] ) / 2 - ( end[ 0 ] - start[ 0 ] ) * curveness
  ];
  

  
  var x = quadraticBezier( start[ 0 ], cp[ 0 ], end[ 0 ], percent );
  var y = quadraticBezier( start[ 1 ], cp[ 1 ], end[ 1 ], percent );
  // console.log(x, y)
  return [x, y]
  
}

function quadraticBezier( p0, p1, p2, t ) {
  var k = 1 - t;
  return k * k * p0 + 2 * ( 1 - t ) * t * p1 + t * t * p2;    // 这个方程就是二次贝赛尔曲线方程
}
  
const Marker = mapboxgl.Marker


var FlyByPoints = (function () {
  const NAME = '啊打发士大夫'

  const SOURCE_ID_POINT = NAME + 'source-point'
  const SOURCE_ID_PATH = NAME + 'source-path'
  const LAYER_ID_POINT = NAME + 'layer-point'
  const LAYER_ID_PATH = NAME + 'layer-path'
  const FLY_ICON_ID = './images/1.png'
  

  function Plugin (map) {
    this.map = null
    this.records = []



    

    this.timer = null
    this.map = map



    map.loadImage(FLY_ICON_ID, (err, image) => {
      map.addImage(FLY_ICON_ID, image)
    })

    map.addSource(SOURCE_ID_POINT, {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [],
      },
    })


    map.addLayer({
      id: LAYER_ID_POINT,
      source: SOURCE_ID_POINT,
      type: 'symbol',
      layout: {
        'icon-size': 1,
        'icon-image': FLY_ICON_ID,
        'icon-rotate': ['get', 'bearing'],
        'icon-rotation-alignment': 'map',
        'icon-allow-overlap': true,
        'icon-ignore-placement': true,
      },
    })

    this.startPlay()
  }

  Plugin.prototype.getAllFlyFeature = function () {
    const features = this.records.map(function (item) {
      return {
        type: 'Feature',
        properties: {
          bearing: item.bearing
        },
        geometry: {
          type: 'Point',
          coordinates: item.coordinates
        }
      }
    })
    return {
      type: 'FeatureCollection',
      features
    }
  }

  Plugin.prototype.startPlay = function () {
    clearInterval(this.timer)
    this.timer = setInterval(() => {
      this.records.forEach(item => {
        
        const start = item.data.path[0].coordinate
        const end = item.data.path[1].coordinate
        item.percent+=item.direction*0.1

        const prePoint = item.coordinates
        const newponit = drawCurvePath(start, end, 1, Math.min(item.percent, 1))
        item.coordinates = newponit
        item.bearing = turf.bearing(turf.point(prePoint), turf.point(newponit))
        console.log("this.getAllFlyFeature()", this.getAllFlyFeature())
        this.map.getSource(SOURCE_ID_POINT).setData(this.getAllFlyFeature())

        if(item.percent>1) {
          item.direction = -1
          // item.marker.setLngLat(newponit)
        } else if(item.percent<=0) {
          item.direction = 1
        }
      })
    }, 100)
  }

  Plugin.prototype.add = function (line) {
    


    
    
    this.records.push({
      direction: 1, // 当前运动方向
      percent: 0, // 当前百分比
      data: line, // 原始数据
      bearing: 0, // 当前旋转度
      coordinates: line.path[0].coordinate, // 当前位置
    })


    
    console.log("line", line, this.records, line.path[0].coordinate)

    
  }

  return Plugin
})();