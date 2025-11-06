import { forEach, max, min } from "@bestime/utils_base"
import addClass from "./addClass"
import createStyle from "./createStyle"
import type { TPartialOptional } from "./help/types"

const oStyle = createStyle('bt-waterflow')

oStyle(`
.bt-waterflow{position:relative;list-style:none;margin:0;padding:0;box-sizing:border-box;}
.bt-waterflow-item{list-style:none;margin:0;padding:0;position:absolute;bottom:unset;right:unset;left:0;top:0;opacity:0;transition: left 0.5s, top 0.5s;transition-timing-function: cubic-bezier(0.935, 0.070, 0.630, 0.975);}  
`)


interface IItemInfo {
  left: number
  top: number
  height: number
}


interface IWaterfallFlowConfig {
  el: HTMLElement
  gap: number
  autoResize?: number
}

type TMatrix = Array<{
  height: number,
  data: IItemInfo[]
}>


function getMinMatrix (data: TMatrix) {
  const minHeight = min(data, function (item) {
    return item.height
  })
  const minHeightColIdx = Math.max(data.findIndex(c=>c.height === minHeight), 0)  
  return {
    index: minHeightColIdx,
    position: data[minHeightColIdx]
  }
}




export default class WaterfallFlow {
  private _cfg: IWaterfallFlowConfig
  private _timer: any
  constructor (config: TPartialOptional<IWaterfallFlowConfig, 'gap'>) {
    this._cfg = Object.assign({
      gap: 10
    } as IWaterfallFlowConfig, config)

    addClass(config.el, 'bt-waterflow-wrapper')

    // console.log("哈哈哈22", this._cfg)

    if(this._cfg.autoResize) {
      this._timer = setInterval(() => {
        this.resize()
      }, this._cfg.autoResize);
    }
  }  

  resize () {
    const oLis:HTMLCollectionOf<HTMLDivElement> = this._cfg.el.getElementsByClassName('bt-waterflow-item') as any
    if(oLis.length === 0) return;
    const width = this._cfg.el.offsetWidth
    const columns = Math.max(1, Math.floor((width+this._cfg.gap)/(oLis[0].offsetWidth+this._cfg.gap)))
    const matrix: TMatrix = []

    const offestLeft = (width - (columns-1) * this._cfg.gap - oLis[0].offsetWidth * columns) / 2
    // console.log("offestLeft", offestLeft, '=>', width, (columns-1) * this._cfg.gap, oLis[0].offsetWidth * columns)

    // console.log("columns", columns)
    

    for(let index = 0; index<columns; index++) {
      matrix.push({
        height: 0,
        data: []
      })
    }
    for(let index = 0; index<oLis.length; index++) {
      const oItem = oLis[index]
      const minMatrix = getMinMatrix(matrix)
      // console.log("minMatrix", minMatrix)
      const topGap = minMatrix.position.height > 0 ? this._cfg.gap : 0
      const pos:IItemInfo = {
        left: offestLeft + (oItem.offsetWidth+this._cfg.gap)*minMatrix.index,
        top: minMatrix.position.height +topGap,
        height: oItem.offsetHeight,
      }

      minMatrix.position.height = pos.height + pos.top
      minMatrix.position.data.push(pos)
      oItem.style.left =pos.left + 'px'
      oItem.style.top =pos.top + 'px'
      oItem.style.opacity = '1'
    }

    const maxHeight = max(matrix, function (item) {
      return item.height
    }) ?? 0
    this._cfg.el.style.height = maxHeight + 'px'
    // console.log("matrix", matrix)
  }
  

  dispose () {
    clearInterval(this._timer)
  }
}

// new WaterfallFlow({
//   el: document.createElement('div'),
//   autoResize: 200
// })