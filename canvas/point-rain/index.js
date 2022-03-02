
function getRandom (min, max, isInt) {
  isInt = isInt === false ? 0 : 1
  min = Math.random() * ( max - min + isInt) + min;
  return isInt ? Math.floor(min) : min
}

function hexToRgb (hex) {
  var rgb = [];
  for(var i=1; i<7; i+=2){
    rgb.push(parseInt("0x" + hex.slice(i,i+2)));
  }
  return rgb;
}



export default class PointRain {
  text = 'abcdefghijklmnopqrstuvwxyz'
  fontSize = 14
  color = [0,255,0]
  reverse = false
  isStop = false

  constructor (oCanvas, option) {
    this.draw = this.draw.bind(this)
    const width = oCanvas.offsetWidth
    const height = oCanvas.offsetHeight
    oCanvas.width = width
    oCanvas.height = height
    this.width = width
    this.height = height

    if(option) {
      this.text = option.text || this.text
      this.fontSize = option.fontSize || this.fontSize
      this.color = option.color ? hexToRgb(option.color) : this.color
      this.reverse = option.reverse != null ? option.reverse : this.reverse
    }
    
    this.oCanvas = oCanvas
    this.ctx = oCanvas.getContext('2d');
    this.textLineHeight = this.fontSize * 1.2
    this.count = Math.ceil(this.height / this.textLineHeight)   
    
    this.getPointList()
    this.draw()    
  }

  draw () {
    if(this.isStop) return clearTimeout(this.timer);
    this.ctx.font = this.fontSize + 'px "Microsoft YaHei"'
    this.ctx.textBaseline = 'top';
    this.ctx.clearRect(0,0,this.width, this.height)
    this.pointList.forEach((column) => {
      
      column.list.forEach((point, index) => {
        let opacity;
        if(this.reverse) {
          opacity = (index - column.currentIndex) / 10
          opacity = 1-point.speed * opacity
          if(index<column.currentIndex) {
            opacity = 0
          }
        } else {
          opacity = (column.currentIndex - index) / 10
          opacity = 1-point.speed * opacity  
          if(index>column.currentIndex) {
            opacity = 0
          }
        }        
        
        if(opacity>0) {
          this.ctx.fillStyle = `rgba(${this.color.join(',')}, ${opacity})`
          this.ctx.fillText(point.text, point.x, point.y)
        }
      })      

      if(this.reverse) {
        column.currentIndex--
        
        if(column.currentIndex+10<0) {
          column.currentIndex = this.count + getRandom(0, this.count)
        }
      } else {
        column.currentIndex++
        if(column.currentIndex-10>column.list.length-1) {
          column.currentIndex = -getRandom(0, this.count)
        }
      }
      
    })
    clearTimeout(this.timer)
    this.timer = setTimeout(this.draw, 80)
  }


  createColumn (x, y) {    
    const res = []
    for(let a = 0; a<this.count; a++) {
      let textIndex = getRandom(0, this.text.length-1)
      res.push({
        text: this.text[textIndex],
        x,
        y: Math.floor(a*this.textLineHeight),
        speed: 1
      })
    }
    return {
      currentIndex: y,
      list: res
    };
  }

  dispose () {
    this.isStop = true
    clearTimeout(this.timer)
  }

  start () {
    this.isStop = false
    this.draw()
  }

  getPointList () {
    const row = []
    const textWidth = this.fontSize
    
    let rowCount = Math.floor(this.width / textWidth)
    
    for(let a =0;a<rowCount; a++) {
      let rh = 0
      for(let h = 0; h<this.count; h++) {
        if(h) {
          rh += getRandom(rh+10, this.count)
        } else {
          rh += getRandom(rh, 10)
        }
        
        if(rh > this.count) {
          break;
        }
        if(this.reverse) {
          row.push(this.createColumn(a*textWidth, this.count+rh))
        } else {
          row.push(this.createColumn(a*textWidth, -rh))
        }
      }
    }
    this.pointList = row
    
    return row;
  }  
}