/**
 * @description 图片粒子化效果
 * @author Jiang Chong Yang (Bestime)
 * @QQ 1174295440
 * @methord canvasImage(oCanvas, src, [callback])
 * 
 * @param {Element} oCanvas 容器
 * @param {String} src 图片地址，需要放在同一服务器下，避免getImageData跨域
 * @param {Function} [callback] 初始化成功的回调函数
 */

var canvasImage = (function () {
  return function (oCanvas, src, callback) {
    var ctx = oCanvas.getContext('2d');
    var list = [], startTime, duration = 1500, timer;
    getImage(src, function (oImage) {
      callback && callback();
      oCanvas.width = oImage.width;
      oCanvas.height = oImage.height;
      var y = 0, x = 0;
      ctx.drawImage(oImage, 0, 0, oImage.width, oImage.height);
      var imgData = ctx.getImageData(0, 0, oImage.width, oImage.height);
      startTime = +new Date;
      for(var index = 0; index < imgData.data.length; index+=4) {
        list.push({
          r: imgData.data[index],
          g: imgData.data[index + 1],
          b: imgData.data[index + 2],
          x: x, // 原始x
          y: y, // 原始y
          x1: ns.getRandom(0, oImage.width), // 初始随机x
          y1: ns.getRandom(0, oImage.height), // 初始随机y
          startTime: startTime, // 开始运动的时间
          nowTime: 0, // 当前运动事时间
          done: false, // 是否回到原始位置
        })
        x++;
        if(x >= oImage.width) {
          y++;
          x = 0;
        }
      }
      
      function draw () {
        var nowTime = +new Date;
        var count = 0;
        ctx.clearRect(0,0,oImage.width,oImage.height);
        for(var index = 0, item, len = list.length; index < len; index++) {
          item = list[index]
          if(item.done) {
            x = item.x;
            y = item.y;
          } else {
            item.nowTime = nowTime - item.startTime;
            var x = CurveCustom(item.nowTime, item.x1, item.x - item.x1, duration);
            var y = CurveCustom(item.nowTime, item.y1, item.y - item.y1, duration);
          }
          count++;
          if(item.nowTime > duration){
            item.done = true;
            x = item.x;
            y = item.y;
          }
          ctx.fillStyle = 'rgba('+ item.r +', '+ item.g +', '+ item.b +', 1)';
          ctx.fillRect(x, y, 1, 1);
        }

        count && (timer = setTimeout(draw, 17));
      }

      draw();

      oCanvas.onmouseenter = function () {
        for(var index = 0, len = list.length; index < len; index++) {
          list[index].nowTime = 0;
          list[index].startTime = +new Date;
          list[index].done = false;
          list[index].x1 = ns.getRandom(0, oImage.width);
          list[index].y1 = ns.getRandom(0, oImage.height);
        }
        clearTimeout(timer);
        draw();
      }
    })
  }

  function getImage (src, callback) {
    var oImage = new Image();
    oImage.src = src;
    oImage.onload = function () {
      callback(oImage);
    }
  }

  function CurveCustom (t, b, c, d){
    if ((t /= d / 2) < 1) return c / 2 * t * t + b;
      return -c / 2 * ((--t) * (t-2) - 1) + b;
  }
})();