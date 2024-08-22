import defualtFormatter from "./defualtFormatter"
import isNull from "./isNull"

type TAnimateDataInputItem = Record<string, number | undefined>
type TAnimateDataOutputItem = Record<string, number>

type TEasingHandler = (passTime: number, fromValue: number, changeValue: number, duration: number) => number
type TChangeCallack = (data: TAnimateDataOutputItem, progress: number) => void

interface IAnimateOptions {
  /** 原始值 */
  from: TAnimateDataInputItem,
  /** 最终值 */
  to: TAnimateDataInputItem,
  /** 缓动函数 */
  easing: TEasingHandler,
  /** 持续时间：毫秒 */
  duration: number,
  /** 每次值更新的回调 */
  onChange: TChangeCallack
}

export default class Animate {
  _timer: any
  _passTime = 0
  _options: IAnimateOptions
  constructor (options: IAnimateOptions) {
    this._options = options
  }

  start () {
    const { from, to, easing, duration, onChange } = this._options
    const startTime = new Date().getTime() - this._passTime
    const changeData: TAnimateDataOutputItem = {}
    for(let key in to) {
      if(!isNull(to[key])) {
        const v1 = defualtFormatter(0, from[key])
        const v2 = defualtFormatter(0, to[key]) - v1
        from[key] = v1
        changeData[key] = v2
      }
    }
    clearInterval(this._timer)
    this._timer = setInterval(() => {
      this._passTime = new Date().getTime() - startTime
      if(this._passTime >= duration) {
        this._passTime = duration        
      }
      const newValue:TAnimateDataOutputItem = {}
      for(let key in changeData) {        
        newValue[key] = easing(this._passTime, from[key]!, changeData[key], duration)
      }
      const progress = this._passTime / duration
      // 本次动画结束
      if(progress === 1) {
        clearInterval(this._timer)
        this._passTime = 0
      }
      onChange(newValue, progress)
    }, 17)    
    return this
  } 

  stop () {
    clearInterval(this._timer)
    return this
  }

  dispose () {
    this.stop()
  }
}