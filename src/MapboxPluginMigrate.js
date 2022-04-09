import getQuadraticBezierPath from "./split/getQuadraticBezierPath.js"
import { removeLayer, removeImage, removeSource } from "./split/mapboxUtils"
import some from "./split/some.js"
const NAME = "MapboxPluginMigrate"
let turfInject

function createLines(start, end, curveness) {
  const list = [start]
  let point
  for (let a = 0; a < 1; a += 0.01) {
    point = getQuadraticBezierPath(start, end, curveness, a)
    list.push(point)
  }

  list.push(end)

  return list
}





export default function MapboxPluginMigrate(id, map, turfLibrary) {
  turfInject = turfLibrary
  this.records = []
  this.timer = null
  this.map = map

  this.LAYER_ID_POINT = NAME + "layer-point" + id
  this.LAYER_ID_PATH = NAME + "layer-path" + id
  this.LAYER_ID_SHAN_ICON = NAME + "layer-shan" + id

  this.SOURCE_ID_POINT = NAME + "source-point" + id
  this.SOURCE_ID_PATH = NAME + "source-path" + id
  this.SOURCE_ID_SHAN_ICON = NAME + "source-shan" + id

  // 闪烁图标图层
  map.addSource(this.SOURCE_ID_SHAN_ICON, {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [],
    },
  })

  map.addLayer({
    id: this.LAYER_ID_SHAN_ICON,
    type: "symbol",
    source: this.SOURCE_ID_SHAN_ICON,
    layout: {
      "icon-image": ["get", "targetIcon"],
      "icon-rotation-alignment": "map",
      "icon-allow-overlap": true,
      "icon-ignore-placement": true,
    },
  })

  map.addSource(this.SOURCE_ID_PATH, {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [],
    },
  })

  map.addLayer({
    id: this.LAYER_ID_PATH,
    source: this.SOURCE_ID_PATH,
    type: "line",
    paint: {
      "line-width": 2,
      "line-color": ["get", "color"],
      "line-dasharray": [4, 2],
    },
  })

  map.addSource(this.SOURCE_ID_POINT, {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [],
    },
  })

  map.addLayer({
    id: this.LAYER_ID_POINT,
    source: this.SOURCE_ID_POINT,
    type: "symbol",
    layout: {
      "icon-size": 1,
      "icon-image": ["get", "flyIconId"],
      "icon-rotate": ["get", "bearing"],
      "icon-rotation-alignment": "map",
      "icon-allow-overlap": true,
      "icon-ignore-placement": true,
    },
  })

  this.startPlay()
}

MapboxPluginMigrate.prototype.getAllIconPoint = function () {
  const features = this.records.map(function (item) {
    return {
      type: "Feature",
      properties: {
        targetIcon: item.targetIcon,
      },
      geometry: {
        type: "Point",

        coordinates: item.data.path[1].coordinate,
      },
    }
  })

  return {
    type: "FeatureCollection",
    features: features,
  }
}

MapboxPluginMigrate.prototype.getAllLinesFeature = function () {
  const features = this.records.map(function (item) {
    return {
      type: "Feature",
      properties: {
        color: item.data.color,
      },
      geometry: {
        type: "LineString",

        coordinates: item.lines,
      },
    }
  })

  return {
    type: "FeatureCollection",
    features,
  }
}

MapboxPluginMigrate.prototype.getAllFlyFeature = function () {
  const features = this.records.map(function (item) {
    return {
      type: "Feature",
      properties: {
        flyIconId: item.flyIconId,
        bearing: item.bearing,
      },
      geometry: {
        type: "Point",
        coordinates: item.coordinates,
      },
    }
  })
  return {
    type: "FeatureCollection",
    features,
  }
}

MapboxPluginMigrate.prototype.dispose = function () {
  clearInterval(this.timer)
  removeLayer(this.map, this.LAYER_ID_POINT)
  removeLayer(this.map, this.LAYER_ID_PATH)
  removeLayer(this.map, this.LAYER_ID_SHAN_ICON)

  removeSource(this.map, this.SOURCE_ID_POINT)
  removeSource(this.map, this.SOURCE_ID_PATH)
  removeSource(this.map, this.SOURCE_ID_SHAN_ICON)

  this.records.forEach((item) => {
    removeImage(this.map, item.targetIcon)
    removeImage(this.map, item.flyIconId)
  })

  this.records = undefined
}

MapboxPluginMigrate.prototype.startPlay = function () {
  clearInterval(this.timer)
  this.timer = setInterval(() => {
    this.records.forEach((item) => {
      if (item.delete) return
      const start = item.data.path[0].coordinate
      const end = item.data.path[1].coordinate
      item.percent += item.direction * item.speed

      if (item.percent > 1) {
        item.direction = -1
        item.percent = 1
        item.count++
      } else if (item.percent <= 0) {
        item.percent = 0
        item.direction = 1
      }

      const prePoint = item.coordinates
      const newponit = getQuadraticBezierPath(
        start,
        end,
        item.curveness,
        item.percent
      )
      item.coordinates = newponit
      item.bearing = turfInject.bearing(
        turfInject.point(prePoint),
        turfInject.point(newponit)
      )

      this._updateFlyIcon()
    })
  }, 17)
}

MapboxPluginMigrate.prototype._updatePathAndTarget = function () {
  this.map.getSource(this.SOURCE_ID_PATH).setData(this.getAllLinesFeature())
  this.map.getSource(this.SOURCE_ID_SHAN_ICON).setData(this.getAllIconPoint())
}

MapboxPluginMigrate.prototype._updateFlyIcon = function () {
  this.map.getSource(this.SOURCE_ID_POINT).setData(this.getAllFlyFeature())
}

MapboxPluginMigrate.prototype.removeById = function (id) {
  for (let a = 0; a < this.records.length; a++) {
    if (this.records[a].id === id) {
      this.records.splice(a--, 1)
    }
  }
  this._updateFlyIcon()
  this._updatePathAndTarget()
}

MapboxPluginMigrate.prototype.add = function (line) {
  const existPointId = some(this.records, function (item) {
    return item.id === line.id
  })

  if (existPointId) return

  const iconId = "targetIcon-" + line.id
  !map.hasImage(iconId) &&
    map.addImage(iconId, line.targetIcon, { pixelRatio: 2 })

  const flyIconId = "flyicon-" + line.id
  !map.hasImage(flyIconId) && map.addImage(flyIconId, line.flyIcon)
  
  this.records.push({
    id: line.id,
    delete: false,
    speed: line.speed,
    curveness: line.curveness,
    flyIconId,
    targetIcon: iconId,
    direction: 1, // 当前运动方向
    percent: 0, // 当前百分比
    data: line, // 原始数据
    bearing: 0, // 当前旋转度
    count: 0, // 跑了几次
    lines: createLines(
      line.path[0].coordinate,
      line.path[1].coordinate,
      line.curveness
    ),
    coordinates: line.path[0].coordinate, // 当前位置
  })

  this._updatePathAndTarget()
}
