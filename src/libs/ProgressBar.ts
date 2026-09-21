import { get } from "@bestime/utils_base"
import { $undefinedValue } from "./help/hpConsts"
import removeElement from "./removeElement"

interface IConfig {
  el: HTMLDivElement,
  itemWidth: number,
  itemGap: number
  backgroundColor?: string
  activeColor?: string
}

/**
 * 进度条canvas电池版。如果容器太长，会自动缩短到最佳尺寸
 */
export default class ProgressBar {
  _canvas: HTMLCanvasElement
  _ctx: CanvasRenderingContext2D
  _width = 0
  _height = 0
  _confg:IConfig
  _itemCount = 0
  constructor (config: IConfig) {
    this._confg = config
    this._canvas = document.createElement('canvas')
    this.size(0, 0)    
    this._ctx = this._canvas.getContext('2d')!
    config.el.appendChild(this._canvas)
  }

  size (width: number, height: number) {
    
    const count = Math.floor((width - this._confg.itemWidth) / (this._confg.itemGap + this._confg.itemWidth))
    const realWidth = (this._confg.itemGap + this._confg.itemWidth) * count + this._confg.itemWidth

    
    this._canvas.width = realWidth
    this._canvas.height = height
    this._canvas.style.width = realWidth + 'px '
    this._canvas.style.height = height + 'px '
    this._width = realWidth
    this._height = height
    this._itemCount = count
    return this
  }

  percent (percent: number) {
    this._ctx.fillStyle = get(this._confg.backgroundColor, '#eee')
    this._ctx.fillRect(0,0,this._width, this._height)
    this._ctx.fillStyle = get(this._confg.activeColor, '#444')
    this._ctx.fillRect(0,0,this._width * percent / 100, this._height)
    const perWidth = this._confg.itemGap + this._confg.itemWidth


    for(let num = 1; num<=this._itemCount; num++) {
      // 为了制造间隙
      this._ctx.clearRect(perWidth*num-this._confg.itemGap, 0, this._confg.itemGap, this._height)
    }
    return this
  }

  dispose () {
    removeElement(this._canvas)
    // @ts-ignore
    this._canvas = $undefinedValue
    // @ts-ignore
    this._ctx = $undefinedValue
    // @ts-ignore
    this._confg = $undefinedValue
    // @ts-ignore
    this._height = $undefinedValue
    // @ts-ignore
    this._itemCount = $undefinedValue
  }
}