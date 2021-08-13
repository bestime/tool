


var ColorLegendView = (function () {
  var keduWidth = 5 // 刻度宽度
  var textSpace = 3 // 文字到刻度的间距
  const _INT = parseInt
  const WU_QIONT_TEXT = '↑'

  function getType (data) {
    return Object.prototype.toString.call(data).slice(8, -1)
  }

  function createAutoList (config) {
    var min = config.min
    var max = config.max
    var per = (max-min)/config.colors.length
    let res = [];
    config.colors.forEach(function (color, index) {
      res.push({
        startValue: min+per * index,
        endValue:min+per * (index+1),
        color: color
      })
    })
    return res
  }
  

  /**
   * @param {Array} startRGB 开始颜色的rgb数组
   * @param {Array} endRGB 结束颜色的rgb数组
   * @param {Number} ratio 开始到结束所在位置比例，用于定位颜色位置
   * @return {Array} rgb数组
   */
  function getRGBfromGradient (startRGB, endRGB, ratio) {
    
    var rStep = (endRGB[0] - startRGB[0]) * ratio;
    var gStep = (endRGB[1] - startRGB[1]) * ratio;
    var bStep = (endRGB[2] - startRGB[2]) * ratio;

    return [
      _INT(rStep + startRGB[0]),
      _INT(gStep + startRGB[1]),
      _INT(bStep + startRGB[2])
    ]
  }
  
  function Main (oCanvas, options) {
    
    this.infinity = options.infinity === true // 是否最后一项无穷大
    
    this.radixPoint = options.radixPoint // 小数点
    this.isAverageyAxis = options.isAverageyAxis === true // 生成y轴平均轴，默认原始刻度
    this.ASC = options.ASC === true ? true : false // 升序排列，从下到上
    this.fontSize = options.axis.fontSize
    this.fontColor = options.axis.fontColor
    this.tickColor = options.axis.tickColor
    this.colorWidth = options.colorWidth || 20
    this.tickShowLabel = options.tickShowLabel === true // 刻度显示label值，默认数字
    this.ctx = oCanvas.getContext('2d'); 
    this.infinityHeight = this.infinity ? this.fontSize*2 : 0
    
    this.gradientMode = options.gradientMode === true ? true : false // 是否渐变模式
    this.height = options.height || oCanvas.offsetHeight

    // this.ASC= false

    var width = this.colorWidth + keduWidth + textSpace
    oCanvas.height = this.height
    var conlorsGroup = this.formatColorList(JSON.parse(JSON.stringify(options.colors)))

    this.colors = conlorsGroup.list
    this.min = conlorsGroup.min
    this.max = conlorsGroup.max
    var avgYaxisConfig;

    if(this.isAverageyAxis) {
      avgYaxisConfig = this.createAverageYaxisConfig()
      width += avgYaxisConfig.maxLabelWidth
    } else {
      width += conlorsGroup.maxLabelWidth
    }
    
    this.width = width
    oCanvas.width = this.width
    oCanvas.style.width = this.width + 'px'
    oCanvas.style.height = this.height + 'px'
    this.ctx.clearRect(0, 0, this.width, this.height)

    this.renderColorBar()
    if(this.isAverageyAxis) {
      this.renderAverageYaxis(avgYaxisConfig.list)
    } else {
      this.renderYaxis()
    }

    this.drawInfinityColor()
    this.drawBorder()
    
  }

  Main.prototype.drawInfinityColor = function () {
    if(!this.infinity) return;
    var grad = this.ctx.createLinearGradient(0, 0, 0, this.infinityHeight);
    var startColor = this.colors[0].start.color
    grad.addColorStop(0, `rgb(${this.infinityItem.color})`);
    grad.addColorStop(1, `rgb(${startColor})`);
    this.ctx.fillStyle = grad
    this.ctx.fillRect(0, 0, this.colorWidth, this.infinityHeight)
    this.ctx.fillStyle = grad

    this.ctx.fillStyle = this.tickColor
    this.ctx.fillRect(this.colorWidth, 0, keduWidth, 1)
    this.ctx.fillStyle = this.fontColor
    this.ctx.textBaseline = 'top';
    this.ctx.fillText(WU_QIONT_TEXT, textSpace+this.colorWidth+keduWidth, 0);
  }

  Main.prototype.drawBorder = function () {
    
    this.ctx.fillStyle = this.tickColor
    this.ctx.fillRect(0, 0, this.colorWidth, 1)
    this.ctx.fillRect(this.colorWidth, 0, 1, this.height)
    this.ctx.fillRect(0, 0, 1, this.height)
    this.ctx.fillRect(0, this.height-1, this.colorWidth, 1)
  }
  Main.prototype.renderColorBar = function () {
    var endHeight;
    this.colors.forEach((item, index) => {
      // if(index>0) return;
      
    
      grad = this.ctx.createLinearGradient(0, item.start.y, 0, item.end.y);
      grad.addColorStop(0, 'rgb('+ item.start.color.join(',') +')');
      grad.addColorStop(1, 'rgb('+ item.end.color.join(',') +')');
      this.ctx.fillStyle = grad
      // this.ctx.fillStyle = 'rgb('+ item.start.color.join(',') +')'
      endHeight = item.height
      if(index===this.colors.length-1) {
        endHeight = this.height - item.start.y
      }
      this.ctx.fillRect(0, item.start.y, this.colorWidth, endHeight)
    })
  }

  Main.prototype.renderAverageYaxis = function (list) {
    
    this.ctx.textAlign = "left";
    this.ctx.font = this.fontSize + 'px "Microsoft YaHei"'
    list.forEach((item, index) => {
      if(index===0) {
        this.ctx.textBaseline = this.ASC ? 'alphabetic' : 'top';
      } else if(index===list.length-1) {
        if(this.infinity) {
          this.ctx.textBaseline = this.ASC ? 'middle':'alphabetic';
        } else {
          this.ctx.textBaseline = this.ASC ? 'top':'alphabetic';
        }
        
      } else {
        this.ctx.textBaseline = 'middle';
      }
      this.ctx.fillStyle = this.tickColor
      this.ctx.fillRect(this.colorWidth, item.y, keduWidth, 1)
      this.ctx.fillStyle = this.fontColor
      this.ctx.fillText(item.label, textSpace+this.colorWidth+keduWidth, item.y);
    })
  }
  
  Main.prototype.createAverageYaxisConfig = function () {
    this.ctx.textAlign = "left";
    this.ctx.font = this.fontSize + 'px "Microsoft YaHei"'
    const _height = this.height - this.infinityHeight

    var yCount = Math.floor(_height / this.fontSize/2)
    var perHeight = _height / yCount
    var per = (this.max - this.min) / yCount
    var list = [], label,labelWidth, labelY;
    var maxLabelWidth = 0;
    
  
    for(var a = 0; a<=yCount; a++) {
      label = this.min + per*a
      labelY = perHeight * a
      if(this.ASC) {
        labelY = _height - labelY+this.infinityHeight
        if(a===0) {
          label = this.min
          labelY -=1
        }
        if(a===yCount) {
          label = this.max
        }
      } else {
        
        if(a===yCount) {
          label = this.max
          labelY = _height-1+this.infinityHeight
        }
      }
      label = this.radixPoint ? label.toFixed(this.radixPoint) : parseInt(label)
      // if(a===yCount && this.infinity) {
      //   label = '+∞'
      // }
      labelWidth = Math.ceil(this.ctx.measureText(label).width);
      maxLabelWidth = Math.max(maxLabelWidth, labelWidth)
      if(this.infinity) {
        maxLabelWidth = Math.max(maxLabelWidth, this.ctx.measureText(WU_QIONT_TEXT).width)
      }
      list.push({
        label: label,
        width: labelWidth,
        y: labelY
      })
    }

    return {
      maxLabelWidth: maxLabelWidth,
      list: list
    }
  }

  Main.prototype.renderYaxis = function () {    
    this.ctx.textAlign = "left";
    this.ctx.font = this.fontSize + 'px "Microsoft YaHei"'

    for(var item, a = 0; a<this.colors.length; a++) {      
      item = this.colors[a]      
      this.ctx.fillStyle = this.fontColor
      if(a==0) {
        this.ctx.fillStyle = this.tickColor
        this.ctx.fillRect(this.colorWidth, 0, keduWidth, 1)
        this.ctx.textBaseline = 'top';
        this.ctx.fillStyle = this.fontColor        
        if(this.tickShowLabel) {
          this.ctx.textBaseline = 'middle';
          this.ctx.fillText(item.start.label, textSpace+this.colorWidth+keduWidth, item.start.y-item.height/2);  
        } else {
          this.ctx.fillText(item.start.value, textSpace+this.colorWidth+keduWidth, item.start.y);  
        }
        
      }
      
      this.ctx.fillStyle = this.tickColor
      this.ctx.fillRect(this.colorWidth, item.end.y, keduWidth, 1)      
      this.ctx.fillStyle = this.fontColor
      if(a<this.colors.length-1) {
        this.ctx.textBaseline = 'middle';
      } else {
        this.ctx.textBaseline = 'alphabetic';
      } 
      
      
      if(this.tickShowLabel) {
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(item.end.label, textSpace+this.colorWidth+keduWidth, item.end.y-item.height/2);
      } else {
        this.ctx.fillText(item.end.value, textSpace+this.colorWidth+keduWidth, item.end.y);
      }
      
    }
  }

  Main.prototype.formatColorList = function (list) {
    var minValue, maxValue;
    if(getType(list) === 'Object') {
      list = createAutoList(list)
    }

    if(this.ASC) {
      list.sort(function (a, b) {
        return b.startValue - a.startValue
      })

      if(this.infinity) {
        this.infinityItem = list.shift()
      }
      
      
      
      var tmp;
      list.forEach(function (item) {
        tmp = item.startValue
        item.startValue = item.endValue
        item.endValue = tmp
      })
      minValue = list[list.length-1].endValue
      maxValue = list[0].startValue
    } else {
      list.sort(function (a, b) {
        return a.startValue - b.startValue
      })
      minValue = list[0].startValue
      maxValue = list[list.length-1].endValue
    }
    
    var valueLength = maxValue - minValue
    var preEnd;
    var useList = []
    var startY, endY;
    var maxLabelWidth=0;
    
    this.ctx.textAlign = "left";
    var maxCustomTickWidth = 0
    var customLabel = ''
    var customeLabelWidth = 0
    this.ctx.font = this.fontSize + 'px "Microsoft YaHei"'
    const avgDrawHeight = this.infinity ? this.height - this.infinityHeight : this.height
    
    if(this.gradientMode) {
      list.forEach((item, index)=> {
        var nextItem = list[index+1]
        if(nextItem) {
          var nextAvg = (nextItem.endValue - nextItem.startValue)/2
          var endValue = item.endValue + nextAvg
          var startValue = preEnd == null ? item.startValue : preEnd
          
          if(index === list.length-2) {
            endValue = nextItem.endValue
          }
  
          var ratio = Math.abs(endValue - startValue) / valueLength
          startY = endY == null ? 0 : endY
          colorPieceHeight = Math.floor(avgDrawHeight * ratio)
          endY = Math.floor(colorPieceHeight + startY)
          endY = Math.min(endY, avgDrawHeight-1)
  
          var startLabelWidth = Math.ceil(this.ctx.measureText(startValue).width);
          var endLabelWidth = Math.ceil(this.ctx.measureText(endValue).width);
          if(this.tickShowLabel) {
            customLabel = item.label
            customeLabelWidth = this.ctx.measureText(customLabel).width
            maxCustomTickWidth = Math.max(maxCustomTickWidth, customeLabelWidth)
          } else {
            if(index===0) {
              maxLabelWidth = Math.max(maxLabelWidth, startLabelWidth)
            }
            maxLabelWidth = Math.max(maxLabelWidth, endLabelWidth)
          }
          
          useList.push({
            ratio: ratio,
            height: colorPieceHeight,
            start: {
              y: startY+this.infinityHeight,
              value: startValue,
              color: item.color,
              width: this.tickShowLabel ? customeLabelWidth: startLabelWidth,
              label: customLabel,
            },
            end: {
              y: endY+this.infinityHeight,
              value: endValue,
              color: nextItem.color,
              width: this.tickShowLabel? customeLabelWidth: endLabelWidth,
              label: customLabel
            }
          }) 
          preEnd = endValue    
        }
      })
    } else {
      list.forEach((item, index)=> {        
        var startValue = item.startValue
        var endValue = item.endValue

        var ratio = Math.abs(endValue - startValue) / valueLength
        
        startValue = this.radixPoint ? startValue.toFixed(this.radixPoint) : parseInt(startValue)
        endValue = this.radixPoint ? endValue.toFixed(this.radixPoint) : parseInt(endValue)
        startY = endY == null ? 0 : endY
        colorPieceHeight = Math.floor(this.height * ratio)
        endY = colorPieceHeight + startY
        if(index === list.length-1) {
          endY = this.height-1
        }

        var startLabelWidth = Math.ceil(this.ctx.measureText(startValue).width);
        var endLabelWidth = Math.ceil(this.ctx.measureText(endValue).width);

        if(this.tickShowLabel) {
          customLabel = item.label
          customeLabelWidth = this.ctx.measureText(customLabel).width
          maxCustomTickWidth = Math.max(maxCustomTickWidth, customeLabelWidth)
        } else {
          if(index===0) {
            maxLabelWidth = Math.max(maxLabelWidth, startLabelWidth)
          }
          maxLabelWidth = Math.max(maxLabelWidth, endLabelWidth)
        }
        
        useList.push({
          ratio: ratio,
          height: colorPieceHeight,
          start: {
            y: startY,
            value: startValue,
            color: item.color,
            label: customLabel,
            width: this.tickShowLabel ? customeLabelWidth : startLabelWidth,
          },
          end: {
            y: endY,
            value: endValue,
            color: item.color,
            label: customLabel,
            width: this.tickShowLabel ? customeLabelWidth : endLabelWidth
          }
        }) 
        preEnd = endValue    
      })
    }
    if(this.infinity) {
      maxLabelWidth = Math.max(maxLabelWidth, this.ctx.measureText(WU_QIONT_TEXT).width)
    }
    
    return {
      min: minValue,
      max: maxValue,
      list: useList,
      maxLabelWidth: this.tickShowLabel ? maxCustomTickWidth : maxLabelWidth
    }
  }

  Main.prototype.getColor = function (value) {
    var min, max, color, minKey, maxKey;
    
    
    if(this.ASC) {
      minKey = 'end'
      maxKey = 'start'
    
    } else {
      minKey = 'start'
      maxKey = 'end'
    }

    if(value >= this.max) {
      color = this.ASC ? this.colors[0][maxKey].color : this.colors[this.colors.length-1][maxKey].color 
      if(this.infinity) {
        color= this.infinityItem.color
      }
    } else{
      for(var item, a = 0; a < this.colors.length; a++) {
        item = this.colors[a]
        min = item[minKey].value
        max = item[maxKey].value
        if(min <= value && value < max) {
          color = getRGBfromGradient(item[minKey].color, item[maxKey].color, (value - min) / (max-min))
          break;
        }
      }
    }
    color = color ? 'rgb('+ color.join(',') +')' : undefined 
    return color
  }

  return Main;
})();