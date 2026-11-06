import { get, isEmpty } from "@bestime/utils_base";
import addClass from "./addClass";
import createStyle from "./createStyle"
import removeClass from "./removeClass";
import toggleClass from "./toggleClass";

const oStyle = createStyle('bt-browser-marqueetext')

oStyle(`
.bt-browser-marqueetext span {display: inline-block;}  
.bt-browser-marqueetext span.ready {transition: 1s linear;}
`)

interface IConfig {
  el:HTMLDivElement,
  text: string
  /** 每秒走几px */
  step?: number
}

export default class MarqueeText {
  #unMounted = false
  #wrapper: HTMLDivElement;
  #content: HTMLSpanElement;
  #left = 0;
  #timer: any = null;
  /** 每秒走几px */
  #step = 100
  #text = ''
  #mouseIn = false
  constructor (setting: IConfig) {
    const oContent = document.createElement('span')
    addClass(setting.el, ['bt-browser-marqueetext', 'jy-overflow-hidden', 'jy-text-keep-all'])
    oContent.innerHTML = setting.text
    setting.el.innerHTML = ''
    setting.el.appendChild(oContent)
    this.#step = get(setting.step, 100)
    this.#text = setting.text

    
    this.#wrapper = setting.el
    this.#content = oContent
    
    this.#updatePos(this.#wrapper.offsetWidth, false)
    setting.el.addEventListener('mouseenter', this.#onMouseenter)
    setting.el.addEventListener('mouseleave', this.#onMouseleave)
    this.play()
  }

  #onMouseenter = () => {
    this.#mouseIn = true
    this.pause()
  }

  #onMouseleave = () => {
    this.#mouseIn = false
    this.play()
  }

  #updatePos (offsetX: number, animate: boolean) {
    if(animate) {

      addClass(this.#content, 'ready')
    } else {
      removeClass(this.#content, 'ready')
    }

    this.#left = offsetX
    this.#content.style.transform = 'translateX('+ offsetX +'px)';
  }

  #render () {
    const maxWidth = this.#wrapper.offsetWidth
    const minWidth = -this.#content.offsetWidth
    if(this.#left <= minWidth) { 
      this.#updatePos(maxWidth, false)
    } else {
      let toX = this.#left-this.#step
      toX = Math.max(minWidth, toX)
      // console.log('toX', toX)
      this.#updatePos(toX, true)    
    }    
  }

  play () {
    clearInterval(this.#timer)
    this.#timer = setInterval(() => {      
      if(!this.#text) {
        this.pause()
      } else {
        this.#render()
      }      
    }, 1000);
    return this;
  }

  pause () {
    clearInterval(this.#timer)   
    return this;
  }

  setText (text: string) {
    if(!this.#unMounted) {
      this.#text = text
      this.#content.innerText = text
      if(!this.#mouseIn) {
        this.play()
      }
    }

    return this;    
  }

  dispose () {
    this.#unMounted = true
    this.#wrapper.removeEventListener('mouseenter', this.#onMouseenter)
    this.#wrapper.removeEventListener('mouseleave', this.#onMouseleave)
    this.pause()
  }
}

