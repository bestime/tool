import { _Number, getType, hexToRgba, max, min, rgbaToHex, roundFixed, split } from "@bestime/utils_base"

function rgbStringToList (rgba: string) {
  const str = rgba.replace(/^rgba\((.*)\)$/, '$1')
  const list = split(str, ',')

  return list.map(function (c) {
    return _Number(c)
  })

}

function getColorByRadio(color1: string, color2: string, percentage: number) {
  percentage = Math.min(percentage, 1)
  let [r1, g1, b1] = rgbStringToList(hexToRgba(color1));
  let [r2, g2, b2] = rgbStringToList(hexToRgba(color2));

  let r = Math.round(r1 + (r2 - r1) * percentage);
  let g = Math.round(g1 + (g2 - g1) * percentage);
  let b = Math.round(b1 + (b2 - b1) * percentage);

  return rgbaToHex(`rgba(${r},${g},${b},1)`)
}

interface IColorItem {
  data: number,
  color: string
}

interface IOptions {
  fontFamily: string
  fontSize: number
  tickWidth: number
  tickColor: string,
  fontColor: string
  paddingTop: number,
  paddingBottom: number,
  colors: IColorItem[]
}

interface IUseColorItem {
  from: {
    value: number,
    color: string,
    ratio: number
  }
  to: {
    value: number,
    color: string,
    ratio: number
  }
  ratio: number
  label: string,
}

function convertColors (data:IColorItem[]) {
  data.sort(function (a, b) {
    return a.data - b.data
  })
  const result:IUseColorItem[] = []
  let minV = min(data, function (item) {
    return item.data
  })!
  let maxV = max(data, function (item) {
    return item.data
  })!
  const diff = maxV - minV
  let fromRatio = 0
  let toRatio = 0
  for(let index = 1; index<data.length; index++) {
    const pre = data[index-1]
    const item = data[index]
    const ratio = (item.data - pre.data) / diff
    toRatio = fromRatio + ratio
    
    result.push({
      from: {
        value: pre.data,
        color: pre.color,
        ratio: fromRatio
      },
      to: {
        value: item.data,
        color: item.color,
        ratio: toRatio
      },
      ratio,
      label: `${pre.data}至${item.data}`
    })

    fromRatio = toRatio
  }  
  console.log("转换", result)
  return {
    data:result,
    max: maxV,
    min: minV
  }
}

export default class LinearGradientColorLegend {
  _cfg: IOptions
  _canvas: HTMLCanvasElement | undefined
  _colorList: IUseColorItem[] = []
  _ctx: CanvasRenderingContext2D | undefined
  _minValue: number = 0
  _maxValue: number = 0
  
  constructor (options: Partial<IOptions>) {
    this._cfg = Object.assign({
      fontSize: 14,
      fontFamily: 'Microsoft YaHei',
      tickWidth: 5,
      paddingTop: 10,
      paddingBottom: 10,
      tickColor: '#92949b',
      fontColor: '#444',
      colors: []
    } as IOptions, options)
    
    this.setColors(this._cfg.colors)
  }

  mount (oCanvas: HTMLCanvasElement) {
    this._canvas = oCanvas
    this._ctx = oCanvas.getContext('2d')!
    
    this._draw()
  }

  _drawAxias (width: number, height: number) {
    const ctx = this._ctx!
    
    
    const {fontFamily, fontSize, tickWidth, paddingTop, paddingBottom } = this._cfg
    ctx.font = `${fontSize}px ${fontFamily}`
    
    let perTextH = fontSize * 3
    const realHeight = height-paddingBottom-paddingTop
    const count = Math.ceil(realHeight / perTextH)
    perTextH = realHeight / count
    
    ctx.textBaseline = 'middle'
    
    let maxLabelWidth = 0
    const axisData: {
      label: string
      width: number
    }[] = []

    const textGap = 4

    for(let index = 0; index<=count; index++) {
      const ratio = (1-index / count)

      const text =  roundFixed(ratio * (this._maxValue - this._minValue) + this._minValue, 2)
      const info = ctx.measureText(text)
      maxLabelWidth = Math.max(info.width, maxLabelWidth)
      axisData.push({
        label: text,
        width: info.width
      })
    }
    

    for(let index = 0; index<axisData.length; index++) {      
      const item = axisData[index]
      let top = 0
      if(index ===0) {
        top = 0
      }else if(index === axisData.length-1) {
        top = realHeight - 1
      } else {
        top = Math.floor(index * perTextH)
      }
      top = top + paddingTop
      
      const tickX = width - maxLabelWidth - textGap - tickWidth

      ctx.fillStyle = this._cfg.tickColor
      ctx.fillRect(tickX, top, tickWidth, 1)

      ctx.fillStyle = this._cfg.fontColor
      ctx.fillText(item.label, tickX + tickWidth + textGap, top);
    }

    return {
      maxLabelWidth: textGap + maxLabelWidth + tickWidth
    }
  }

  _draw () {
    if(!this._canvas || !this._ctx) return this;
    const { paddingTop, paddingBottom } = this._cfg
    const width = this._canvas.offsetWidth
    const height = this._canvas.offsetHeight
    
    this._canvas.width = width
    this._canvas.height = height
    this._ctx.clearRect(0,0,width,height)
    
    const { maxLabelWidth } = this._drawAxias(width, height)

    const colorAreaHeight = height - paddingTop - paddingBottom

    for(let index = 0; index<this._colorList.length;index++) {
      const item = this._colorList[index]
      let fromT = colorAreaHeight * (1-item.to.ratio)
      let toT = colorAreaHeight * (1-item.from.ratio)
      fromT = Math.ceil(fromT + paddingTop)
      toT = Math.ceil(toT + paddingTop)
      const gradient = this._ctx.createLinearGradient(0, fromT, 0, toT);      
      gradient.addColorStop(1, item.from.color);    // 在渐变的开始添加红色
      gradient.addColorStop(0, item.to.color);   // 在渐变的结束添加蓝色
      this._ctx.fillStyle = gradient;
      // console.log("drawedH", fromT, toT, item)
      this._ctx.fillRect(0, fromT, width - maxLabelWidth, toT-fromT);
      // break
    }
  }

  setColors (colors: IColorItem[]) {
    if(colors.length < 2) {
      return this;
    }
    const pse = convertColors(colors)
    this._colorList = pse.data
    this._minValue = pse.min!
    this._maxValue = pse.max!
    this._draw()
    return this;
  }


  /**
   * 根据值获取颜色
   * @param value 
   * @returns 
   */
  getColor (value: number) {
    if(!this._colorList.length) return '#0000'
    if(isNaN(value) || getType(value) !== 'Number') {
      value = this._colorList[0].from.value
    }
    const perColor = this._colorList.find(function (c) {
      return value >= c.from.value && value < c.to.value
    }) ?? this._colorList[this._colorList.length-1]

    // console.log("获取的颜色", value, perColor, this._colorList)

    const ratio = Math.min(value / (perColor.to.value - perColor.from.value), 1)
    
    return getColorByRadio(perColor.from.color, perColor.to.color, ratio)
  }
}


