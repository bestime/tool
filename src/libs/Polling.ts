type VoidFunc =() => void
function emptyFunc (a: VoidFunc, b: VoidFunc) {}

interface PollingOption {
  interval: number,
  timeout: number,
  onMessage?: (remainTime: number) => void
  handler: (next: VoidFunc, done: VoidFunc) => void
}

export default class Polling  {
  private _timer: any
  private _timer_info: any
  private _stamp = 0
  private _passStamp = 0
  private _option: PollingOption

  constructor (setting: Partial<PollingOption>) {
    this._option = Object.assign({
      timeout: 1000 * 6,
      interval: 1000,
      handler: emptyFunc
    }, setting)

    this._next = this._next.bind(this)
    this._doOnce = this._doOnce.bind(this)
    this.done = this.done.bind(this)
  }

  private _next () {
    clearInterval(this._timer)
    this._passStamp = +new Date() - this._stamp
    this._timer = setTimeout(this._doOnce, this._option.interval)
    return this
  }

  private _doOnce () {
    if(this._passStamp>=this._option.timeout) {
      this._option.onMessage && this._option.onMessage(0)
      this.done()
      return this
    }
    this._option.handler(this._next, this.done)
  }

  start () {
    this._stamp = +new Date()
    this.done()
    this._doOnce()
    let pass = 0
    let last = 0
    if(this._option.onMessage) {
      clearInterval(this._timer_info)
      this._timer_info = setInterval(() => {        
        pass = +new Date() - this._stamp
        last = Math.max(this._option.timeout - pass, 0)
        if(last===0) {
          this.done()
        }
        this._option.onMessage!(last)
      }, 100)
    }
    return this
  }

  done () {
    clearTimeout(this._timer)
    clearTimeout(this._timer_info)
    return this
  }

  dispose () {
    this.done()
    return this
  }
}
