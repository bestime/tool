
export default class CircularSector {
  count = 10
  spaceAngle = 1
  thick = 20
  color = 'red'

  constructor (oCanvas, option) {
    const width = oCanvas.offsetWidth
    const height = oCanvas.offsetHeight
    oCanvas.width = width
    oCanvas.height = height

    if(option) {
      if(option.count) {
        this.count = option.count
      }
      
      if(option.spaceAngle) {
        this.spaceAngle = option.spaceAngle
      }

      if(option.thick) {
        this.thick = option.thick
      }

      if(option.color) {
        this.color =option.color
      }
    }
    
    
    this.radius = width / 2
    this.centerX = this.radius
    this.centerY = this.radius
    this.oCanvas = oCanvas
    this.ctx = oCanvas.getContext('2d');

    this.drawSector()

    
  }

  drawSector () {
    const perAngle = (360-this.spaceAngle*this.count) / this.count
    let startAngle = 0, endAngel = 0;
    for(let a = 0; a<this.count;a++) {
      endAngel = startAngle + perAngle
      this.drawAngelRange(startAngle, endAngel, this.color, this.thick)
      startAngle = endAngel + this.spaceAngle
    }
  }

  drawAngelRange (fromAngle, toAngle, color, penWidth) {
    fromAngle = Math.PI / 180 * fromAngle
    toAngle = Math.PI / 180 * toAngle
    const  radius = this.radius - penWidth/2
    this.ctx.lineWidth = penWidth;
    this.ctx.beginPath();
    this.ctx.strokeStyle = color
    this.ctx.arc(this.centerX,this.centerY,radius,fromAngle,toAngle,false);
    this.ctx.stroke();
    this.ctx.save();
    this.ctx.closePath()
  }
}