interface IOptions {
  disabled?: boolean,
  gapX: number
  gapY: number
  text: string[]
  /** 行高（仅支持倍率） */
  fontLineHeight: number
  fontSize: number
  fontBackgroundColor: string
  fontFamily: string
  fontColor: string
  /** 旋转角度（0-360） */
  angle: number
}

const textCanvas = document.createElement('canvas')


function createRotatedRectCanvas(config: IOptions) {
  const angle = config.angle * Math.PI / 180;  
  const ctx = textCanvas.getContext('2d')!;
  ctx.font = `${config.fontSize}px ${config.fontFamily}`;

  let width = 0
  const widthList: number[] = []
  
  
  config.text.forEach(function (str) {
    const info = ctx.measureText(str)
    widthList.push(info.width)
    width = Math.max(info.width, width)
  })

  const lineHeight = config.fontSize*config.fontLineHeight
  
  
  const height =  lineHeight* config.text.length

  // console.log("实时", width,height, config)


  // 计算旋转后的矩形的包围盒尺寸
  const rotatedWidth = Math.abs(width * Math.cos(angle)) + Math.abs(height * Math.sin(angle));
  const rotatedHeight = Math.abs(width * Math.sin(angle)) + Math.abs(height * Math.cos(angle));

  // 创建 canvas 并设置大小为包围盒尺寸
  
  textCanvas.width = rotatedWidth;
  textCanvas.height = rotatedHeight;

  // 平移坐标系到包围盒中心，再旋转，再绘制原始矩形
  ctx.translate(rotatedWidth / 2, rotatedHeight / 2);
  ctx.rotate(angle);
  
  // 绘制矩形（以中心为参考）
  ctx.fillStyle = config.fontBackgroundColor;
  ctx.fillRect(-width / 2, -height / 2, width, height);
  ctx.fillStyle = config.fontColor
  ctx.font = `${config.fontSize}px ${config.fontFamily}`;
  ctx.textBaseline = 'top'
  ctx.textAlign = 'left'
  const offsetY = (lineHeight-config.fontSize)/2
  config.text.forEach(function (str, index) {
    const offsetX = width/2 - widthList[index]/2
    ctx.fillText(str, -width / 2+offsetX, -height / 2 + index * lineHeight+offsetY)
  })
  


  return {
    img: textCanvas,
    width: rotatedWidth,
    height: rotatedHeight
  };
}



export default class WaterMark {
  _cfg: IOptions;
  _oWrapper: HTMLDivElement
  _canvas: HTMLCanvasElement
  

  constructor(oWrapper:HTMLDivElement, config: Partial<IOptions>){
    this._oWrapper = oWrapper
    this._cfg = Object.assign({
      fontFamily: 'Microsoft YaHei',
      fontLineHeight: 1.4,
      gapX: 20,
      gapY: 0,
      fontBackgroundColor: 'rgba(0,0,0,0)',
      angle: -45,
      text: ['作者 bestime', '2025-04-09'],
      fontSize: 16,
      fontColor: 'red'
    }, config)
    
    this._canvas = this._reload()
    this._draw()
  }

  _reload () {
    let oCanvas = this._canvas    
    if(!oCanvas) {
      oCanvas = document.createElement('canvas')
      this._oWrapper.appendChild(oCanvas)      
    }
    return oCanvas;
  }
  
  setConfig (config: Partial<IOptions>) {
    Object.assign(this._cfg, config)
    this._draw()
  }


  _draw () {
    const oCanvas = this._reload()
    const width = this._oWrapper.offsetWidth * window.devicePixelRatio
    const height = this._oWrapper.offsetHeight * window.devicePixelRatio
    oCanvas.width = width
    oCanvas.height = height
    oCanvas.style.cssText = 'position:absolute;left:0;top:0;right:0;bottom:0;z-index: 1;user-select: none;pointer-events: none;'
    oCanvas.style.width = this._oWrapper.offsetWidth + 'px'
    oCanvas.style.height = this._oWrapper.offsetHeight + 'px'
    const ctx = oCanvas.getContext('2d')
    if(!ctx) return;
    
    ctx.clearRect(0,0,width,height)
    if(this._cfg.disabled) return;
    
    
    const txtImg = createRotatedRectCanvas(this._cfg)
    for(let x = 0; x<width; x+=txtImg.width+this._cfg.gapX) {      
      for(let y = 0; y<height; y+= txtImg.height+this._cfg.gapY) {
        ctx.drawImage(txtImg.img, x ,y)
      }
    }
  }
}