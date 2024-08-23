import _Number from "./_Number"
import cloneEasy from "./cloneEasy"
import defualtFormatter from "./defualtFormatter"
import type { TKvPair } from "./help/type-declare"
import isArray from "./isArray"
import isKvPair from "./isKvPair"
import isNull from "./isNull"
import isNumber from "./isNumber"


type TEasingHandler = (passTime: number, fromValue: number, changeValue: number, duration: number) => number
type TChangeCallack<T> = (data: T, progress: number) => void


interface IAnimateOptions<T> {
  /** 原始值 */
  from: T,
  /** 最终值 */
  to: T,
  /** 缓动函数 */
  easing: TEasingHandler,
  /** 持续时间：毫秒 */
  duration: number,
  /** 每次值更新的回调 */
  onChange: TChangeCallack<T>
}

export default class Animate<T extends TKvPair> {
  _timer: any
  _passTime = 0
  _options: IAnimateOptions<T>
  _middleData: T
  constructor (options: IAnimateOptions<T>) {
    this._options = options
    this._middleData = cloneEasy(options.to)
  }

  start () {
    const { from, to, easing, duration, onChange } = this._options
    const startTime = new Date().getTime() - this._passTime
    
    clearInterval(this._timer)
    this._timer = setInterval(() => {
      let goneTime = Math.min(new Date().getTime() - startTime, duration)
    
      
      ;(function deepProperties (mChild, fChild, tChild) {
        function compireOne (key: number | string) {
          if(isNumber(fChild[key]) || isNumber(tChild[key])) {
            const v1 = _Number(fChild[key])
            const v2 = _Number(tChild[key])
            const diff = v2 - v1
            // @ts-ignore
            mChild[key] = easing(goneTime, v1, diff, duration)
          } else if(isArray(fChild[key]) || isKvPair(fChild[key])) {
            // @ts-ignore
            deepProperties(mChild[key], fChild[key], tChild[key])
          }
        }
        if(isArray(fChild)){
          for(let index = 0; index<fChild.length; index++) {
            compireOne(index)
          }
        } else if(isKvPair(fChild)) {
          for(let key in mChild) {
            compireOne(key)
          }
        }
        
      })(this._middleData, from, to);
      // const newValue:TAnimateDataOutputItem = {}
      // for(let key in changeData) {        
      //   newValue[key] = easing(this._passTime, from[key]!, changeData[key], duration)
      // }
      const progress = goneTime / duration
      // 本次动画结束
      if(progress === 1) {
        clearInterval(this._timer)
        goneTime = 0
      }
      this._passTime = goneTime
      onChange(this._middleData, progress)
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