import "./theme/default.scss"
import { observeDomResize } from '@bestime/utils_browser'
import SingleBar from "./SingleBar"

interface IOption {
  el: HTMLDivElement,
  fade?: boolean
}

export default class ScrollBar {
  _config: IOption
  _horizontal: SingleBar
  _vartical: SingleBar
  _obsv: ReturnType<typeof observeDomResize>
  constructor (config: IOption) {
    this._onVerticalChange = this._onVerticalChange.bind(this)
    this.refresh = this.refresh.bind(this)
    this._onHorizontalChange = this._onHorizontalChange.bind(this)
    this._onMouseScroll = this._onMouseScroll.bind(this)
    this._config = Object.assign({}, config)
    if(config.fade) {
      config.el.classList.add('fade')
    } else {
      config.el.classList.add('visible')
    }
    this._horizontal = new SingleBar({
      el:config.el,
      direction: 'horizontal',
      onChange: this._onHorizontalChange,
    })
    this._vartical = new SingleBar({
      el:config.el,
      direction: 'vertical',
      onChange: this._onVerticalChange
    })
    
    this.refresh()
    this._initListen()
    this._obsv = observeDomResize(config.el, this.refresh, ['height', 'width'])
  }

  _initListen () {
    const oWrap = this._config.el.getElementsByClassName('scroll_bar_wrap')[0] as HTMLDivElement
    oWrap.addEventListener('scroll', this._onMouseScroll)
  }

  _onMouseScroll () {
    const oTarget = this._config.el.getElementsByClassName('scroll_bar_wrap')[0] as HTMLDivElement
    const dx = oTarget.scrollWidth-oTarget.offsetWidth
    const dy = oTarget.scrollHeight-oTarget.offsetHeight
    const y = oTarget.scrollTop / dy
    const x = oTarget.scrollLeft / dx
    this._horizontal.setRatio(x)
    this._vartical.setRatio(y)
  }

  _onHorizontalChange (ratio: number) {
    const oWrap = this._config.el.getElementsByClassName('scroll_bar_wrap')[0] as HTMLDivElement
    const oContent = this._config.el.getElementsByClassName('scroll_bar_view')[0] as HTMLDivElement
    const pW = oWrap.offsetWidth
    const cW = oContent.offsetWidth
    const top = (cW - pW) * ratio
    oWrap.scrollLeft = top    
  }
  _onVerticalChange (ratio: number) {
    const oWrap = this._config.el.getElementsByClassName('scroll_bar_wrap')[0] as HTMLDivElement
    const oContent = this._config.el.getElementsByClassName('scroll_bar_view')[0] as HTMLDivElement
    const pW = oWrap.offsetHeight
    const cW = oContent.offsetHeight
    const top = (cW - pW) * ratio
    oWrap.scrollTop = top
  }

  refresh () {
    const width = this._config.el.offsetWidth
    const height = this._config.el.offsetHeight
    const oContent = this._config.el.getElementsByClassName('scroll_bar_view')[0] as HTMLDivElement
    const oW = oContent.offsetWidth
    const oH = oContent.offsetHeight
    this._horizontal.setSize(width, oW)
    this._vartical.setSize(height, oH)
    this._onMouseScroll()
  }

  dispose () {
    const oWrap = this._config.el.getElementsByClassName('scroll_bar_wrap')[0] as HTMLDivElement
    this._horizontal.dispose()
    this._vartical.dispose();
    oWrap.removeEventListener('scroll', this._onMouseScroll)
    this._obsv()
  }
}