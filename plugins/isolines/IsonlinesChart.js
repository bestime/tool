const AXIS_FONT_LINE_HEIGHT =  2
const TICK_SIZE = 5 // 刻度线高度、宽度
const AXIS_LABEL_SPACE = 5
const BACKGROUND_COLOR = 'black'

function sleep (duration) {
  return new Promise(resolve => setTimeout(resolve, duration))
}


function removeElement (el) {
  try {
    el.parentNode.removeChild(el)
  } catch(e) {
    
  }
}

function getRelativePos(el) {
  // var scrollPos = getScrollPosition();
  const bound = el.getBoundingClientRect()
  return {
    x: bound.left,
    y: bound.top,
    height: el.offsetHeight,
    width: el.offsetWidth,
    clientWidth: el.clientWidth,
    clientHeight: el.clientHeight
  };
}



function createThrottle (handler, wait, options) {
  wait = wait || 100
  var startTime = 0, nowTime, self, timer01, arg, timer02, count = 0;
  options = options || {}

  var leading = options.leading === true // wait 前调用
  var trailing = options.trailing === true // wait 后调用

  // 重置，为下一次操做周期做准备
  function resetLoop () {
    startTime = 0
    count = 0
  }

  // 检测最后一次
  function checkLast () {
    if(trailing && (count > 1 || !leading)) {
      main()
      timer02 = setTimeout(resetLoop, wait)
    } else {
      resetLoop()
    }
  }

  function main () {
    startTime = +new Date()
    handler.apply(self, arg)
  }

  return function () {
    count++
    arg = arguments
    self = this
    nowTime = +new Date()
    clearTimeout(timer01)
    clearTimeout(timer02)    
    if(startTime===0) {
      if(leading) {
        main()
      } else {
        startTime = nowTime
      }
    } else if(nowTime - startTime >= wait) {
      main()
    }
    timer01 = setTimeout(checkLast, wait)
  }
}




async function asyncForEach (list, handler) {
  for(let index = 0; index < list.length; index++) {
    await handler(list[index], index)
  }
}

function hideLongXaxis (list, startKey, endKey) {
  if(!list.length) return;
  let hideIndex = -1, compareItem = list[0]
  for(var column, index = 1; index < list.length; index++) {
    column = list[index]
    if(column.show) {
      if(column[startKey] < compareItem[endKey]) {
        hideIndex = index
        break
      }else {
        compareItem = column
      }
    } 
  }
  
  if(hideIndex >= 0) {
    var canRemoveNext = false
    for(var index = 0; index < list.length; index++) {
      if(list[index].show) {
        if(canRemoveNext) {
          list[index].show = false
          canRemoveNext = false
        }  else {
          canRemoveNext = true
        }          
      }
    }
    hideLongXaxis(list, startKey, endKey)
  }
}



/**
 * 获取一段文本在canvas上所占宽度
 * @param {object} ctx 画布
 * @param {string} text 文本
 * @param {number} fontSize 文本字体
 * @return {number} textWidth
*/
function getTextWidth (ctx, text, fontSize) {
  ctx.font = fontSize + 'px "Microsoft YaHei"'
  return Math.ceil(ctx.measureText(text).width)
}

/**
 * （公用方法）计算y轴每一个的位置，并处理是否显示
 * @param {arrya<value, label>} list
 * @param {number} totalHeight y轴总高度
 * @param {number} lineHeight y轴字体行高
 * @param {number} fontSize y轴字体大小
 * @return {array}
*/
function yAxisListToPinned (ctx, list, totalHeight, lineHeight, fontSize) {
  const preHeight = totalHeight / (list.length-1)
  let y, maxWidth = 0;
  list.forEach(function (item, index) {
    y = Math.floor(totalHeight - preHeight * index)
    Object.assign(item, {
      y,
      show: true, // 是否需要绘制
      width: getTextWidth(ctx, item.label,fontSize )
    })
    maxWidth = Math.max(maxWidth, item.width)
  })
  return maxWidth
}

function getDefaultAxisConfig(){
  return {
    fontSize: 12,
    fontColor: 'rgba(255,255,255,1)',
    tickColor: 'rgba(255,255,255,0.5)',
    gridColor: '#333'
  }
}


export default class IsonlinesChart {
  oCanvas = null
  width = 0
  height = 0
  _resizeTime = 0
  _yAxisWidth = 50 // y轴宽度，更新数据时会重新计算
  _xAxisHeight = 50 // x轴高度，更新数据时会重新计算
  _backgroundColor = BACKGROUND_COLOR
  _topHeight = 50
  _rightWidth = 0
  gridSize = 60

  _padding = {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  }

  _gridDrawingWidth = 0 // 留给绘制网格的实际宽度
  _gridDrawingHeight = 0 // 留给绘制网格的实际高度

  _yAxisConfig = getDefaultAxisConfig()
  _xAxisConfig = getDefaultAxisConfig()

  _title = {
    text: '单位(KM)',
    fontSize: 16,
    color: 'yellow'
  }

  constructor (oWrapper, options) {
    oWrapper.classList.add('IsonlinesChart')

    this.oWrapper = oWrapper
    this.oCanvas = document.createElement('canvas')
    this._ctx = this.oCanvas.getContext('2d')

    this._oCrossX = document.createElement('div')
    this._oCrossX.className = 'IsonlinesChart_cross_x'

    this._oCrossY = document.createElement('div')
    this._oCrossY.className = 'IsonlinesChart_cross_y'

    
    if(options) {
      this._yAxisConfig = Object.assign(this._yAxisConfig, options.yAxis)
      this._xAxisConfig = Object.assign(this._xAxisConfig, options.xAxis)
      this._backgroundColor = options.backgroundColor || BACKGROUND_COLOR
      this._padding = Object.assign(this._padding, options.padding)
      this._title = Object.assign(this._title, options.title)
    }

    

    this._xAxisHeight = AXIS_LABEL_SPACE + this._xAxisConfig.fontSize + TICK_SIZE + this._padding.bottom
    this.width = oWrapper.offsetWidth
    this.height = oWrapper.offsetHeight
    this.oCanvas.width = this.width
    this.oCanvas.height = this.height
    oWrapper.appendChild(this.oCanvas)
    oWrapper.appendChild(this._oCrossX)
    oWrapper.appendChild(this._oCrossY)

  }

  /**
   * @param {array} multiPolygonList 等值线后的数据列表
   * @param {number} gridCountX 原始格点横坐标个数
   * @param {number} gridCountY 原始格点纵坐标个数
   * @param {number} xKm 横坐标代表的总公里数
   * @param {number} yKm 纵坐标代表的总公里数
   */
  async setOption (multiPolygonList, gridCountX, gridCountY, xKm, yKm) {
    this.xKm = xKm
    this.yKm = yKm
    this.gridCountY = gridCountY
    this.gridCountX = gridCountX
    this._topHeight = this._padding.top
    this._rightWidth = this._padding.right + getTextWidth(this._ctx, xKm.toFixed(1), this._xAxisConfig.fontSize)/2
    
    this._ctx.clearRect(0,0,this.width, this.height)

    

    // 绘制背景色
    this._ctx.fillStyle = this._backgroundColor
    this._ctx.fillRect(0,0, this.width, this.height)

    if(this._title.text) {
      
      this._ctx.font = this._title.fontSize + 'px "Microsoft YaHei"'
      this._ctx.textBaseline = 'hanging';
      this._ctx.textAlign = 'right'
      this._ctx.fillStyle = this._title.color
      this._ctx.fillText(this._title.text,this.width-this._rightWidth,this._topHeight);
      this._topHeight += this._title.fontSize + 10
    }

    

    this._gridDrawingHeight = this.height - this._xAxisHeight - this._topHeight
    
    const { yAxisList, maxYlabelWidth } = this._getYaxisList()
    this.yAxisList = yAxisList
    this._yAxisWidth = maxYlabelWidth + TICK_SIZE + AXIS_LABEL_SPACE + this._padding.left

    this._gridDrawingWidth = this.width - this._yAxisWidth - this._rightWidth

    this.scaleX = this._gridDrawingWidth / (gridCountX-1)
    this.scaleY = this._gridDrawingHeight / (gridCountY-1)

    this._drawYaxis()
    this._drawXaxis(gridCountX)
    this._createCrossTool()

    await asyncForEach(multiPolygonList, async polygon => {
      await asyncForEach(polygon.points, async item => {
        this._ctx.beginPath()
        await asyncForEach(item, async (point, index) => {
          if(index==0) {
            this._ctx.moveTo(this._yAxisWidth+point[0]*this.scaleX, (point[1])*this.scaleY+this._topHeight)
          } else {
            this._ctx.lineTo(this._yAxisWidth+point[0]*this.scaleX, point[1]*this.scaleY+this._topHeight)
          }
        })
        this._ctx.fillStyle = polygon.color
        this._ctx.fill()
        this._ctx.closePath()
        await sleep(30)
      })
    })
  }
  

  dispose () {
    this._ctx.clearRect(0,0,this.width, this.height)
    this.oWrapper.onmousemove = null
    removeElement(this._oCrossY)
    removeElement(this._oCrossX)
    removeElement(this.oCanvas)
  }

  /**
   * 获取X轴列表
   */

  _getXaxisList (gridCountX) {
    gridCountX--
    
    const count = Math.floor(this._gridDrawingWidth / this.gridSize)

    const unitPercent = this.xKm/gridCountX

    const perPxiel = gridCountX / count
    const perWidth = this._gridDrawingWidth / count
    
    const res = []
    let label
    for(let index = 0; index<=count; index++) {
      label=(index*perPxiel*unitPercent).toFixed(1);
      res.push({
        x: Math.ceil(index<count ? index * perWidth : index * perWidth-1),
        value: index,
        label,
        show: true,
        width: getTextWidth(this._ctx, label, this._xAxisConfig.fontSize)
      })
    }
    return res
  }


  _drawYaxis () {
    this._ctx.font = this._yAxisConfig.fontSize + 'px "Microsoft YaHei"'
    this._ctx.textAlign = 'right'
    this._ctx.textBaseline = 'middle';

    this.yAxisList.forEach(item => {
      
      // 绘制刻度
      this._ctx.fillStyle = this._yAxisConfig.tickColor
      this._ctx.fillRect(this._yAxisWidth-TICK_SIZE, item.y+this._topHeight, TICK_SIZE, 1)

      // 绘制网格
      this._ctx.fillStyle = this._yAxisConfig.gridColor  
      this._ctx.fillRect(this._yAxisWidth, item.y+this._topHeight, this._gridDrawingWidth, 1)
      
      // 绘制文本
      this._ctx.fillStyle = this._yAxisConfig.fontColor
      this._ctx.fillText(item.label,this._yAxisWidth-TICK_SIZE-AXIS_LABEL_SPACE,item.y+this._topHeight);
    })

    // 绘制轴线
    this._ctx.fillStyle = this._yAxisConfig.tickColor
    this._ctx.fillRect(this._yAxisWidth, this._topHeight, 1, this._gridDrawingHeight)
  }

  _drawXaxis (gridCountX) {
    const list = this._getXaxisList(gridCountX)
    
    this._ctx.textBaseline = 'hanging';
    this._ctx.textAlign = 'center'
    list.forEach((item, index) => {
      if(!item.show) return;
      
      // 绘制刻度
      this._ctx.fillStyle = this._xAxisConfig.tickColor  
      this._ctx.fillRect(item.x+this._yAxisWidth, this._gridDrawingHeight+this._topHeight+1, 1, TICK_SIZE)

      // 绘制网格
      if(index>0) {
        this._ctx.fillStyle = this._xAxisConfig.gridColor
        this._ctx.fillRect(item.x+this._yAxisWidth, this._topHeight, 1, this._gridDrawingHeight)
      }

      // 绘制文本
      this._ctx.fillStyle = this._xAxisConfig.fontColor
      this._ctx.fillText(item.label, item.x+this._yAxisWidth, this._gridDrawingHeight + this._topHeight+TICK_SIZE+AXIS_LABEL_SPACE);
    })

    this._ctx.fillStyle = this._xAxisConfig.tickColor
    this._ctx.fillRect(this._yAxisWidth, this._gridDrawingHeight+this._topHeight, this._gridDrawingWidth, 1)
  }

  _createCrossTool () {
    this._oCrossX.style.width = this._gridDrawingWidth + 'px'
    this._oCrossX.style.left = this._yAxisWidth + 'px'
    this._oCrossY.style.top = this._topHeight + 'px'
    this._oCrossY.style.height = this._gridDrawingHeight + 'px'



    const yUnit = this.yKm/this._gridDrawingHeight
    const xUnit = this.xKm / this._gridDrawingWidth
    this.oWrapper.onmousemove = (ev) => {
      var wrapperPos = getRelativePos(this.oWrapper)
      var x = ev.clientX - wrapperPos.x
      var y = ev.clientY - wrapperPos.y
      if(x >= this._yAxisWidth && y >= this._topHeight && x<=this._gridDrawingWidth+this._yAxisWidth && y<=this._gridDrawingHeight + this._topHeight) {
        x = Math.max(x, this._yAxisWidth)
        y = Math.max(y, this._topHeight)
        x = Math.min(x, this._gridDrawingWidth+this._yAxisWidth)
        y = Math.min(y, this._gridDrawingHeight + this._topHeight)
        var grid_x = x - this._yAxisWidth
        var grid_y = y - this._topHeight
        var km_x = (grid_x*xUnit).toFixed(2)
        var km_y = (this.yKm - grid_y*yUnit).toFixed(2)
        this._oCrossX.style.top = y + 'px'
        this._oCrossY.style.left = x + 'px'
        this._oCrossY.innerHTML = `<span>${km_x}</span>`
        this._oCrossX.innerHTML = `<span>${km_y}</span>`
        this._oCrossX.classList.add('show')
        this._oCrossY.classList.add('show')
      } else {
        this._oCrossX.classList.remove('show')
        this._oCrossY.classList.remove('show')
      }
    }
  }

  /**
   * 获取Y轴列表
   */
  _getYaxisList () {
    const count = Math.floor(this._gridDrawingHeight / this.gridSize)
    const perPxiel = this.gridCountY / count
    const perHeight = this._gridDrawingHeight / count
    const unitPercent = this.yKm/this.gridCountY
    const list = []
    let label, labelWidth;
    let maxLabelWidth = 0
    for(let a = 0; a<=count; a++) {
      label = (this.yKm-perPxiel * a*unitPercent).toFixed(1)
      labelWidth = getTextWidth(this._ctx, label, this._yAxisConfig.fontSize)
      maxLabelWidth = Math.max(maxLabelWidth, labelWidth)
      list.push({
        value: a,
        label,
        show: true,
        width:labelWidth,
        y: Math.ceil(perHeight * a)
      })
    }
    return {
      yAxisList: list,
      maxYlabelWidth: maxLabelWidth
    }
  }
}