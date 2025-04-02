type TCallback = (ms: number) => void
type THander = (callback: TCallback) => void







/**
 * 每隔一段时间更新服务器时间与本地时间差（为了不频繁去请求服务器）
 * 
 */
export default class ServerDate {
  private _diff = 0
  private _interval: number
  private _handler: THander
  private _timer = -1
  private _actionId = Number.MIN_SAFE_INTEGER
  private _isRuning = false

  /**
   * 
   * @param interval - 多久更新一次时间差
   * @param _handler - 用户去获取服务器时间的代码
   */
  constructor (interval: number, _handler: THander) {
    this._interval = interval
    this._handler = _handler    
  }

  private _refresh () {
    if(!this._isRuning) return;
    
    const cfId = +this._actionId
    this._isRuning = true
    clearTimeout(this._timer)
    this._handler(sms => {
      if(cfId !== this._actionId) return;
      this._diff = sms - new Date().getTime()
      clearTimeout(this._timer)
      this._timer = setTimeout(() => {
        this._refresh()
      }, this._interval)
    })
  }

  /**
   * 更新一次服务器时间
   */
  updateOnce (callback: () => void) {
    const isRun = this._isRuning
    this._handler(sms => {
      this._diff = sms - new Date().getTime()
      callback()
      if(isRun) {
        this.play()
      }
    })
  }

  /**
   * 定时更新服务器时间
   */
  play () {
    this._isRuning = true
    this._refresh()
    return this;
  }

  /**
   * 暂停定时更新服务器时间
   * @returns 
   */
  pause () {
    this._isRuning = false
    clearTimeout(this._timer)
    return this;
  }

  /**
   * 获取服务器当前时间戳（请确保play() 已经执行成功）
   * @returns 
   */
  getTime () {
    return new Date().getTime() + this._diff
  }
}