class CanvasLayer {
  map = null
  constructor(map) {
    console.log("map", map)
    this.map = map
  }

  lnglat2pix(lng, lat) {
    let lnglat = this.map.project([lng, lat])
    let x = Math.round(lnglat.x)
    let y = Math.round(lnglat.y)
    return [x, y]
  }
}
