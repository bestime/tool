import { LineString, Coordinate } from "maptalks";
import type { LineStringCoordinatesType, LineStringOptionsType } from "maptalks";
import { cloneDeep } from "lodash";
import { defualtFormatter, isNull } from "@bestime/utils_base";



/**
 * 心跳线条（循环放大缩小效果）
 */
class HeartbeatLineString extends LineString {  
  _testCount = 0
  _heartbeatConfig = {
    duration: 200 as number,
    isRestore: true,
    isMouseIn: false,
    originZindx: 0,
    targetZindex: 0,
    looping: false,
    originStyle: {} as Record<string, any>,
    targetStyle: {} as Record<string, any>,
  }

  _player: ReturnType<typeof this.animate> | undefined
  
  constructor(coordinates: LineStringCoordinatesType, options: LineStringOptionsType & {
    targetWidth: number
    duration: number
  }) {
    super(coordinates, options);
    if(options.symbol) {
      this._heartbeatConfig.originStyle = cloneDeep(options.symbol);
    }
    this._heartbeatConfig.duration = options.duration
    this._heartbeatConfig.originZindx = defualtFormatter(0, options.zIndex)
    this._heartbeatConfig.targetZindex = 1 + this._heartbeatConfig.originZindx
    this._heartbeatConfig.targetStyle = {
      lineWidth: options.targetWidth
    }


    this._onMouseenter = this._onMouseenter.bind(this)
    this._onMouseout = this._onMouseout.bind(this)

    this.on("mouseenter", this._onMouseenter);
    this.on("mouseout", this._onMouseout);
  }

  updateSymbol(symbol: any) {
    // this._heartbeatConfig.originStyle = cloneDeep(symbol);
    super.updateSymbol(symbol);
    return this;
  }

  _onMouseenter () {
    this._heartbeatConfig.isMouseIn = true
    this.playActive();
  }
  _onMouseout () {
    this._heartbeatConfig.isMouseIn = false
    this.playRestore(true);
  }

  play () {
    const style = this.getSymbol()
    if(isNull(style._targetWidth)) {
      style._targetWidth = style.lineWidth
    }
    

    this.updateSymbol(style)
    return this;
  }

  playLoop() {
    this._heartbeatConfig.looping = true    
    this._clearPlayer()
    const doOnce = async () => {
      if(!this._heartbeatConfig.looping && this._heartbeatConfig.isRestore) return; // 被暂停了
      if (this._heartbeatConfig.isRestore) {
        await this.playActive();
        this._heartbeatConfig.isRestore = false
      } else {
        await this.playRestore();
        this._heartbeatConfig.isRestore = true
      }
      doOnce()
    };

    doOnce();
  }
  

  async playActive () {
    this._clearPlayer()
    this.setZIndex(this._heartbeatConfig.targetZindex)
    return new Promise((resolve) => {
      this._player = this.animate(
        {
          symbol: this._heartbeatConfig.targetStyle,
        },
        {
          duration: this._heartbeatConfig.duration,
        },
        (frame) => {
          if (frame.state.playState === "finished") {
            resolve(true);
          }
        }
      );
    });
  }

  async playRestore (isMouse?: boolean) {
    
    // 正在循环播放，不要回复远洋
    if(isMouse && this._heartbeatConfig.looping) {
      this.playLoop()
      return;
    }
    
    
    this._clearPlayer()
    return new Promise((resolve) => {
      this._player = this.animate(
        {
          symbol: this._heartbeatConfig.originStyle,
        },
        {
          duration: this._heartbeatConfig.duration,
        },
        (frame)=> {
          if (frame.state.playState === "finished") {
            if(!this._heartbeatConfig.looping) {
              this.setZIndex(this._heartbeatConfig.originZindx)
            }
            resolve(true);
          }
        }
      );
    });
  }

  remove() {
    this.stopLoop()
    this._player?.finish();
    this._clearPlayer()
    this.off("mouseenter", this._onMouseenter);
    this.off("mouseout", this._onMouseout);
    // @ts-ignore 
    this?._clearAllListeners?.()
    
    super.remove()
    return this;
  }

  /** maptalks的bug，需要清空this._animPlayer，不然有缓存 */
  _clearPlayer () {
    this._player?.pause();
    // @ts-ignore
    this._animPlayer = void 0
  }

  stopLoop () {
    this._heartbeatConfig.looping = false
    return this;
  }
}

HeartbeatLineString.registerJSONType("HeartbeatLineString");

export default HeartbeatLineString;
