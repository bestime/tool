
const TICK_SIZE = 5 // 刻度线高度、宽度
const AXIS_LABEL_SPACE = 5
const AXIS_FONT_LINE_HEIGHT =  2
const XAXIS_NAME_SPACE = 5

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

function xAxisListToPinned (ctx, list, scale, fontSize) {
  let x, labelWidth;
  list.forEach(function (item, index) {
    x = Math.floor(index * scale)
    labelWidth =getTextWidth(ctx, item.label,fontSize )
    Object.assign(item, {
      x,
      endX: x + labelWidth,
      show: true, // 是否需要绘制
      width: labelWidth
    })
  })
  hideLongXaxis(list, 'x', 'endX')
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


function getDefaultAxisConfig(){
  return {
    fontSize: 12,
    fontColor: '#000',
    tickColor: 'red',
    gridColor: 'rgba(0,0,0,0.1)',
    name: {
      text: null,
      fontSize: 14,
      fontColor: 'pink'
    }
  }
}

export default class ProfileCanvasChart {
  _gridOriginWidth = 0 // 网格真实宽度
  _gridOriginHeight = 0 // 网格真实高度
  _dotWidth = 10 // 一个格点宽度
  pixelated = false
  _topHeight = 100
  
  _padding = {
    right: 20,
    top: 0,
    left: 0,
    bottom: 0
  }


  _gridDrawingWidth = 0 // 留给绘制网格的实际宽度
  _gridDrawingHeight = 0 // 留给绘制网格的实际高度

  _yAxisConfig = getDefaultAxisConfig()

  _xAxisConfig = getDefaultAxisConfig()
  

  _yAxisWidth = 50 // y轴宽度，更新数据时会重新计算
  _xAxisHeight = 50 // x轴高度，更新数据时会重新计算
  width = 0
  height = 0
  _scaleDotY = 1
  _scaleDotX = 1
  
  
  constructor (oCanvas, options) {
    this.oCanvas = oCanvas
    this._ctx = oCanvas.getContext('2d')
    
    console.log('急急急', options)
    if(options) {
      
      this._padding = Object.assign(this._padding, options.padding)
      this._dotWidth = options.pointWidth
      this.pixelated = options.pixelated // 放大后像素化
      this._yAxisConfig = Object.assign(this._yAxisConfig, options.yAxis)
      this._xAxisConfig = Object.assign(this._xAxisConfig, options.xAxis)

      if(options.xAxis.name.text) {
        this._padding.right = getTextWidth(this._ctx, options.xAxis.name.text, options.xAxis.name.fontSize) + XAXIS_NAME_SPACE
      }
    }

    

    
    this.width = oCanvas.offsetWidth
    this.height = oCanvas.offsetHeight
    this._topHeight = this._yAxisConfig.fontSize + (this._yAxisConfig.name.text ? this._yAxisConfig.name.fontSize : 0)
    this._xAxisHeight = this._yAxisConfig.fontSize + TICK_SIZE + AXIS_LABEL_SPACE
    this._gridDrawingHeight = this.height - this._xAxisHeight - this._topHeight
    this.yAxisList = this._getYaxisList()
    this._yAxisWidth = yAxisListToPinned(this._ctx, this.yAxisList, this._gridDrawingHeight, AXIS_FONT_LINE_HEIGHT, this._yAxisConfig.fontSize) + TICK_SIZE + AXIS_LABEL_SPACE
    if(this._yAxisConfig.name.text) {
      const yNameWidth = getTextWidth(this._ctx, this._yAxisConfig.name.text, this._yAxisConfig.name.fontSize)
      console.log('yNameWidth', yNameWidth)
      this._yAxisWidth = Math.max(this._yAxisWidth, yNameWidth/2)
    }


    




    this._gridDrawingWidth = this.width - this._yAxisWidth - this._padding.right
    

    this.oCanvas.width = this.width
    this.oCanvas.height = this.height


    this._oOriginalCanvas = document.createElement('canvas')
    this._originalCtx = this._oOriginalCanvas.getContext('2d')


    
    document.body.appendChild(this._oOriginalCanvas)

    

    
    
  }
  

  setGridList (gridList) {
    this._gridOriginHeight = this._getGridHeight(gridList)
    this._gridOriginWidth = gridList.length * this._dotWidth

    console.log('_gridOriginWidth', gridList.length,this._dotWidth)
    
    if(this.pixelated) {
      if(this._gridOriginWidth < this._gridDrawingWidth) {
        this._scaleDotX = this._gridDrawingWidth / this._gridOriginWidth
        this._dotWidth *= this._scaleDotX
        this._gridOriginWidth = this._gridOriginWidth * this._scaleDotX
      }
  
      if(this._gridOriginHeight < this._gridDrawingHeight) {
        this._scaleDotY = this._gridDrawingHeight / this._gridOriginHeight
        this._gridOriginHeight = this._gridOriginHeight * this._scaleDotY
      }
    }

    

    this._oOriginalCanvas.width = this._gridOriginWidth
    this._oOriginalCanvas.height = this._gridOriginHeight
    
    
    
    this._drawYaxis()
    this._drawXaxis(gridList)
    this._draw(gridList)
  }

  _draw (list) {
    let preHeight, itemHeight;
    list.forEach((row, rowIdx) => {
      preHeight = 0
      row.forEach((columnItem) => {
        itemHeight = Math.ceil(columnItem.height * this._scaleDotY)
        if(columnItem.color) {
          this._originalCtx.fillStyle = columnItem.color
          this._originalCtx.fillRect(Math.ceil(rowIdx*this._dotWidth),this._gridOriginHeight-preHeight-itemHeight, this._dotWidth, itemHeight);
        }
        preHeight += itemHeight
      })
    })

    
    this._ctx.drawImage(this._oOriginalCanvas,this._yAxisWidth,this._topHeight,this._gridDrawingWidth, this._gridDrawingHeight)
  }


  _getGridHeight (list) {
    let maxHeight = 0
    list.forEach(function (row) {
      let total = 0;
      row.forEach(function (column) {
        total += column.height
      })
      maxHeight = Math.max(maxHeight, total)
    })
    return maxHeight
  }

  /**
   * 获取X轴列表
   */

  _getXaxisList (dataList) {
    return dataList.map((item, index) => {
      return {
        value: index,
        label: index
      }
    })
  }

  _drawXaxis (gridList) {
    const list = this._getXaxisList(gridList)
    xAxisListToPinned(this._ctx, list, this._scaleDotX, this._xAxisConfig.fontSize)
    
    console.log('x轴', list)
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

    
    this._ctx.fillStyle = this._xAxisConfig.gridColor
    this._ctx.fillRect(this._yAxisWidth + this._gridDrawingWidth-1, this._topHeight, 1, this._gridDrawingHeight)

    if(this._xAxisConfig.name.text) {
      this._ctx.font = this._xAxisConfig.name.fontSize + 'px "Microsoft YaHei"'
      this._ctx.fillStyle = this._xAxisConfig.name.fontColor
      this._ctx.textBaseline = 'middle';
      this._ctx.textAlign = 'left'
      this._ctx.fillText(this._xAxisConfig.name.text, this._yAxisWidth+this._gridDrawingWidth+XAXIS_NAME_SPACE, this._topHeight + this._gridDrawingHeight);
    }
    
  }

  /**
   * 获取Y轴列表
   */
  _getYaxisList () {
    const yLabelHeight = this._yAxisConfig.fontSize * AXIS_FONT_LINE_HEIGHT
    const yLabelCount = Math.ceil(this._gridDrawingHeight / yLabelHeight)
    const list = []
    let value;
    for(let a = 0; a <= yLabelCount; a++) {
      value = a
      list.push({
        value,
        label: value
      })
    }
    
    return list
  }

  _drawYaxis () {
    this._ctx.font = this._yAxisConfig.fontSize + 'px "Microsoft YaHei"'
    this._ctx.textAlign = 'right'
    this._ctx.textBaseline = 'middle';

    this.yAxisList.forEach((item, index) => {
      
      this._ctx.fillStyle = this._yAxisConfig.tickColor
      this._ctx.fillRect(this._yAxisWidth-TICK_SIZE, item.y+this._topHeight, TICK_SIZE, 1)

      this._ctx.fillStyle = this._yAxisConfig.gridColor
      this._ctx.fillRect(this._yAxisWidth, item.y+this._topHeight, this._gridDrawingWidth, 1)
      
      this._ctx.fillStyle = this._yAxisConfig.fontColor
      this._ctx.fillText(item.label,this._yAxisWidth-TICK_SIZE-AXIS_LABEL_SPACE,item.y+this._topHeight);
    })

    this._ctx.fillStyle = this._yAxisConfig.tickColor
    this._ctx.fillRect(this._yAxisWidth, this._topHeight, 1, this._gridDrawingHeight)



    if(this._yAxisConfig.name.text) {
      this._ctx.fillStyle = this._yAxisConfig.name.fontColor
      this._ctx.font = this._yAxisConfig.name.fontSize + 'px "Microsoft YaHei"'
      this._ctx.textBaseline = 'hanging';
      this._ctx.textAlign = 'center'
      this._ctx.fillText(this._yAxisConfig.name.text,this._yAxisWidth,0);
    }
    
  }


  /**
   * 倒换 X轴和Y轴数据
   * 默认一个x刻度对应一列数据，如果原始数据为一个Y刻度对应一行数据，就先转换一次
   * @param {array} originRowList 行数据
   */
  static exchangeRowToColumn (originRowList) {
    var res = []
    originRowList.forEach(function (row) {
      row.forEach(function (item,columnIndex) {
        res[columnIndex] = res[columnIndex] || []
        res[columnIndex].push(item)
      })
    })
    return res
  }
}