

import { addClass, observeDomResize, removeClass } from "@bestime/utils_browser"
import BScroll from '@better-scroll/core'
import MouseWheel from '@better-scroll/mouse-wheel'
import ScrollBar from '@better-scroll/scroll-bar'
BScroll.use(MouseWheel)
BScroll.use(ScrollBar)
const mouseDuration = 300
const mouseDistance = 100

interface IOptions {
  /** 滚动速度：（像素/秒） */
  speed: number
}



interface IScCache {
  timerLeave: any,
  /** 未完成距离，负数。0表示无 */
  inDistance: number,
  doInds: boolean,
  /** 手动设置滚动位置中 */
  manualing: boolean
  ele: HTMLDivElement
  locking: boolean
  scroll: BScroll
}

export default class SeamlessScroll {
  private _cache:IScCache
  _obv: ReturnType<typeof observeDomResize>
  _cfg: IOptions
  constructor (ele: HTMLDivElement, options: Partial<IOptions>) {
    this._cfg = Object.assign({
      speed: 60
    }, options)
    this._cache = {
      inDistance: 0,
      doInds: false,
      manualing: false,
      timerLeave: -1,
      ele: ele,
      locking: false,
      
      scroll: new BScroll(ele, {
        scrollY: true,
        click: true,
        disableMouse: false,
        disableTouch: true,
        bounce: false,
        probeType: 3,
        scrollbar: {
          fade: false,
          interactive: true,
          scrollbarTrackClickable: true
        },
        mouseWheel: {
          speed: 20,
          throttleTime: 150,
          discreteTime: 600,
          invert: false,
          easeTime: mouseDuration
        },
      })
    }

    this._onScrollEnd = this._onScrollEnd.bind(this)
    this._onMouseenter = this._onMouseenter.bind(this)
    this._onMouseout = this._onMouseout.bind(this)
    this._onBeforeTo = this._onBeforeTo.bind(this)

    ele.addEventListener('mouseenter', this._onMouseenter)
    
    ele.addEventListener('mouseleave', this._onMouseout)

    this._cache.scroll.on('scrollEnd', this._onScrollEnd)
    const hooks = this._cache.scroll.scroller.hooks
    hooks.on('scrollTo', this._onBeforeTo)
    this._obv = observeDomResize(ele, () => {
      this._onResize()
    }, ['width', 'height'], 200)

    

    this.scrollY()
  }

  _mouseTo (x: number, fromY: number, toY: number) {
    this._cache.manualing = true
    const diff = Math.abs(fromY - toY)
    const t = mouseDuration * diff / mouseDistance
    
    this._cache.scroll.scrollTo(x, toY, t)    
    
  }

  _onBeforeTo (to: { x: number, y: number }) {
    if(this._cache.manualing || this._cache.inDistance<0) return;
    
    const scroll = this._cache.scroll
    
    
    if(to.y < this._limitY) {      
      scroll.stop()
      
      this._cache.inDistance = to.y - this._limitY
      this._mouseTo(0, scroll.y, this._limitY)
      to.y = this._limitY
      return
    }    
  }

  _onScrollEnd () { 
    const scroll = this._cache.scroll

    if(this._limitY >= scroll.y) {
      scroll.scrollTo(0, 0, 0)
    }

    if(this._cache.doInds)  {
      this._cache.doInds = false
      this._cache.inDistance = 0
    }else if(this._cache.inDistance<0) {
      this._cache.doInds = true
      this._mouseTo(0, 0, this._cache.inDistance)      
    }

    this._cache.manualing = false    
    
    if(!this._cache.locking) {
      this.scrollY()
    }
  }

  _onMouseout () {
    clearTimeout(this._cache.timerLeave)
    this._cache.timerLeave = setTimeout(()=> {
      this._cache.locking = false      
      this.scrollY()
    }, 300)
  }

  _onMouseenter () {    
    clearTimeout(this._cache.timerLeave)
    this._cache.locking = true
    this._cache.scroll.stop()
  }
  
  _checkEnabled () {
    const first = this._cache.ele.querySelector(".seamless_scroll_content") as HTMLDivElement
    
    return first.offsetHeight > this._cache.ele.offsetHeight
  }

  _onResize () {
    const enabled = this._checkEnabled()
    const scroll = this._cache.scroll
    // console.log("嘎嘎嘎", first.offsetHeight, this._cache.ele.offsetHeight)
    if(enabled) {
      scroll.scrollTo(0, 0, 0)
      addClass(this._cache.ele, 'enabled')
    }else {
      // console.log("警用")
      scroll.scrollTo(0, 0, 0)
      removeClass(this._cache.ele, 'enabled')
      
    }
    
    scroll.refresh()
    
    this.scrollY()

  }

  get _limitY () {
    return -this._cache.scroll.scrollerHeight/2
  }

  scrollY () {
    const scroll = this._cache.scroll
    if(!this._checkEnabled()) return;
    const { speed } = this._cfg    
    const duration = Math.abs(this._limitY - scroll.y) / speed * 1000
    scroll.scrollTo(0, this._limitY, duration, {
      style: 'linear',
      fn: function (t) {
        return t
      }
    })
  }

  dispose () {    
    this._obv()
    clearTimeout(this._cache.timerLeave)
    const { scroll, ele } = this._cache
    ele.removeEventListener('mouseenter', this._onMouseenter)    
    ele.removeEventListener('mouseleave', this._onMouseout)
    scroll.off('scrollEnd', this._onScrollEnd)
    scroll.off('scroll', this._onBeforeTo)
    scroll.destroy()
  }

}