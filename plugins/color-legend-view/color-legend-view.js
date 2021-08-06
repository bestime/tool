var colorLegendView = (function () {
  var fontSize = 12
  var colorPiceWidth = 20
  var topSpace = 10
  var bottomSpace = 10
  

  function getXaxisList (ctx, min, max, height) {

    ctx.textBaseline = 'alphabetic';
    ctx.textAlign="start";
    ctx.fillStyle = "rgba(0,0,0,1)"
    ctx.font = fontSize + 'px "Microsoft YaHei"'

    var num = Math.floor(height / (fontSize *2.5))
    var fontSpaceHeight = height / num
    var perValue = (max-min) / num
    let list = []
    for(var oY, a = 0; a <=num; a++) {
      oY = {
        value: Math.floor(min + perValue*a),
        y: Math.min(Math.floor(height-fontSpaceHeight * a), height)+topSpace
      }
      if(a===0) {
        oY.y -= 1
      }
      list.push(oY)


      ctx.fillRect(colorPiceWidth, oY.y, 3, 1)
      
      ctx.fillText(oY.value, colorPiceWidth+7, oY.y+fontSize*0.3);
    }
    // list.reverse()
    
  }


  return function (oCanvas, colorConfig, min, max) {
    var ctx = oCanvas.getContext('2d'); 
    var width = oCanvas.offsetWidth
    var height = oCanvas.offsetHeight

    var drawHeight = height - topSpace - bottomSpace
    
    oCanvas.width = width
    oCanvas.height = height
    oCanvas.style.width = width + 'px'
    oCanvas.style.height = height + 'px'
    var colorPieceHeight = Math.ceil(drawHeight / colorConfig.length)

    


    
    for(var item, grad, a = 0; a < colorConfig.length; a++) {
      item = colorConfig[a]
      var startY =  a * colorPieceHeight + topSpace
      grad  = ctx.createLinearGradient(0, startY, 0, startY+ colorPieceHeight);
      grad.addColorStop(0, 'rgb('+ item[0] +')');
      grad.addColorStop(1, 'rgb('+ item[1] +')');
      ctx.fillStyle = grad;
      ctx.fillRect(0, startY, colorPiceWidth, colorPieceHeight);
    }
    colorConfig.forEach(function (item) {

    }) 
    getXaxisList(ctx, min, max, colorConfig.length*colorPieceHeight )
  }
})();