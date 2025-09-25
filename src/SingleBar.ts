import { Animate } from "@bestime/utils_base"

function Linear(t: number, b: number, c: number, d: number) { 
  return c * t / d + b; 
}

type TDirection = 'horizontal' | 'vertical'

interface IOption {
  el: HTMLDivElement
  direction:TDirection,
  onChange: (ratio: number) => void
}

export default class SingleBar {
  _oBar: HTMLDivElement
  _oController: HTMLSpanElement
  _oBorder: HTMLDivElement
  _config: IOption
  _max = 0
  _startX = 0
  _startY = 0
  _distence = 0
  _downDistence = 0
  _ratio = 0
  _animate:Animate<{
    value: number
  }>


  constructor (option: IOption) {
    this._onMouseDown = this._onMouseDown.bind(this)
    this._onMouseMove = this._onMouseMove.bind(this)
    this._onMouseUp = this._onMouseUp.bind(this)

    

    const oWrapper = document.createElement('div')
    oWrapper.className = `scroll_bar_${option.direction}`
    const oBorder = document.createElement('div')
    oBorder.className = 'scroll_bar_bd'
    this._oController = document.createElement('span')
    oWrapper.appendChild(oBorder)
    oBorder.appendChild(this._oController)
    option.el.appendChild(oWrapper)
    this._oBar = oWrapper
    this._oBorder =oBorder
    this._config = option

    this._animate = new Animate({
      from: {
        value: 0
      },
      to: {
        value: 0
      },
      duration: 100,
      onChange: ()=> {},
      easing: Linear
    })
    

    

    this._oController.addEventListener('mousedown', this._onMouseDown)
  }

  _onMouseMove (ev: MouseEvent) {
    let toV = 0
    if(this._config.direction === 'vertical') {
      const moveY = ev.clientY - this._startY
      toV = moveY + this._downDistence
    } else if(this._config.direction === 'horizontal') {
      const moveX = ev.clientX - this._startX
      toV = moveX + this._downDistence
    }
    this.setRatio(toV/this._max, true)    
  }


  

  setRatio (r: number, setcontentScroll?: boolean) {
    if(r === this._ratio) return;
    r = Math.max(r, 0)
    r = Math.min(r, 1)

    let toV = this._max * r

    switch(this._config.direction) {
      case 'vertical':
        this._oController.style.top = toV + 'px'
        break;
      case 'horizontal':
        this._oController.style.left = toV + 'px'
        break;
    }

    if(setcontentScroll) {
      this._config.onChange(r)
    }
    this._ratio = r
    this._distence = toV
  }

  _onMouseDown (ev: MouseEvent) {
    this._onMouseUp()
    this._config.el.classList.add('pressing')
    this._downDistence = this._distence
    
    this._startX = ev.clientX
    this._startY = ev.clientY
    document.addEventListener('mousemove', this._onMouseMove)
    document.addEventListener('mouseup', this._onMouseUp)
    document.body.style.userSelect = 'none';
  }

  _onMouseUp () {
    this._config.el.classList.remove('pressing')
    document.body.style.userSelect = '';
    document.removeEventListener('mousemove', this._onMouseMove)
    document.removeEventListener('mouseup', this._onMouseUp)
  }

  setSize (wrapperSize: number, contentSize: number) {    
    let ratio = wrapperSize / contentSize
    if(wrapperSize>=contentSize) {
      ratio = 0
      this._oBar.classList.add('disabled')
    } else {
      this._oBar.classList.remove('disabled')
    }
    
    let size = 0
    switch(this._config.direction) {
      case 'horizontal':
        size = this._oBorder.offsetWidth * ratio
        this._oController.style.width = size + 'px'
        this._max = this._oBorder.offsetWidth - size
        break;
      case 'vertical':
        size = this._oBorder.offsetHeight * ratio
        this._oController.style.height = size + 'px'
        this._max = this._oBorder.offsetHeight - size
        break;
    }
  }

  dispose () {
    document.addEventListener('mousemove', this._onMouseMove)
    document.addEventListener('mouseup', this._onMouseUp)
    this._oController.removeEventListener('mousedown', this._onMouseDown)
  }
}