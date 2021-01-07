function RedPacket (options) {
  var oCanvas = options.oCanvas
  var mchName = options.mchName
  var onload = options.onload  
  var scale = options.width / 1080
  var ctx = oCanvas.getContext("2d");
  oCanvas.width = 1080
  oCanvas.height = 1718
  oCanvas.style.width = 1080 * scale + 'px'
  oCanvas.style.height = 1718 * scale + 'px'
  oCanvas.style.backgroundColor = '#eee'

  var qrFlag = false;
  var bgFlag = false;
  


  // 背景图
  var oBg = document.createElement('img')
  oBg.onload = function () {
    bgFlag = true;
    init()
  }
  oBg.src = './bg.jpg'

  
  // 二维码图片
  var oQr = document.createElement('img');
  oQr.setAttribute('crossOrigin', 'anonymous');  
  oQr.onload = function () {
    qrFlag = true
    init()
  }
  oQr.src = options.qr;

  // 初始化
  function init () {
    if(!bgFlag || !qrFlag) return;

    // 绘制背景图
    ctx.drawImage(oBg,0,0);    
    
    // 绘制网吧名字
    ctx.font = "48px bold 微软雅黑";
    ctx.fillStyle = "#0074c5";
    ctx.textBaseline = "left";
    var txt = "活动门店 | " + mchName
    var width = ctx.measureText(txt).width
    var startX = (oCanvas.width - width)/2
    ctx.fillText(txt, startX, 385);


    // 绘制二维码
    ctx.drawImage(oQr, 365, 1046, 350,350);

    // 初始化成功
    onload({
      download: function () {
        var a = document.createElement("a");
        a.setAttribute("download", options.picName)
        a.href = oCanvas.toDataURL("image/jpeg"); 
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
    })
  }
}