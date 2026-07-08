import { forEach, get, getRandom, split } from "@bestime/utils_base"

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const bgColorList = ['#e2e1d3', '#c9e5d4', '#dbc9d9', '#bbe9e9', '#d3b7da', '#c3e6ee', '#dbd9c9', '#d2bcb2', '#d2b2ce', '#b2b7d2']
const fontColorList = ['#46533c', '#6b5f58', '#737386', '#447788', '#59433e', '#9d4c87', '#6d5f6f', '#4a6253', '#989b7a', '#53a070', '#3d7ad6']

function getBgColorRandom () {
  const idx = getRandom(0, bgColorList.length-1)
  return bgColorList[idx]
}

function getFontColorRandom () {
  const idx = getRandom(0, fontColorList.length-1)
  return fontColorList[idx]
}

interface ITextItem {
  value: string,
  start: number
  width: number
}

function getTextRandom () {
  const idx = getRandom(0, chars.length-1)
  return chars[idx]
}

interface IConfig {
  width?: number,
  height?: number,
  fontSize?: number
}

function drawRandomLine (ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.strokeStyle = getFontColorRandom(); 
  ctx.beginPath();
  const beginX = getRandom(0, width)
  const beginY = getRandom(0, height)
  const endX = getRandom(0, width)
  const endY = getRandom(0, height)

  ctx.moveTo(beginX, beginY);
  ctx.lineTo(endX, endY);
  ctx.lineWidth = 1
  ctx.stroke();
  ctx.closePath();
}

export default function graphicalVerificationCode (oCanvas: HTMLCanvasElement, config?: IConfig) {
  const ctx = oCanvas.getContext('2d')!;
  const width = get(config, 130, undefined, 'width')
  const height = get(config, 50, undefined,  'height')
  const fontSize = get(config, 30, undefined,  'fontSize')
  const gap = 10 
  oCanvas.width = width
  oCanvas.height = height
  oCanvas.style.width = width + 'px'
  oCanvas.style.height = height + 'px'
  
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'start';
  ctx.font = fontSize + 'px Arial'

  let tmpLeft = 0
  const drawList: ITextItem[] = []

  function refresh () {    
    tmpLeft = 0
    drawList.length = 0
    const text = getTextRandom() + getTextRandom() + getTextRandom() + getTextRandom()
    const list = split(text,'')
    ctx.fillStyle = getBgColorRandom()
    ctx.fillRect(0,0,width, height)
    forEach(list, function (word, x) {    
      const width = ctx.measureText(word).width
      drawList.push({
        value: word,
        start: tmpLeft,
        width
      })
      
      tmpLeft = tmpLeft + width + gap
    })

    const totalTextWidth = drawList.reduce(function (t, i) {
      return t + i.width
    }, 0) + (drawList.length-1) * gap

    const offsetLeft = (width - totalTextWidth) / 2
    const metrics = ctx.measureText(text);
    const ascent = metrics.actualBoundingBoxAscent;
    const descent = metrics.actualBoundingBoxDescent;
    const totalTextHeight = ascent + descent;
    const offsetHeight = (height - totalTextHeight) / 2 + ascent
    
    forEach(drawList, function (item) {
      ctx.fillStyle = getFontColorRandom()
      ctx.fillText(item.value, offsetLeft + item.start, offsetHeight)
    })
    
    // 绘制几条干扰线
    for(let count = 1; count <= 5; count++) {
      drawRandomLine(ctx, width, height)
    }
    return text
  }

  return {
    refresh
  }
}