var JCYLoading = (function () {
  var isInit = false;
  var _loadingHtml = '<div class="easy-loading easy-loading--circular"><span class="easy-loading__spinner"><svg viewBox="25 25 50 50" class="easy-loading__circular"><circle cx="50" cy="50" r="20" fill="none"></circle></svg></span></div>'

  function createStyle (callback) {
    if(isInit) {
      callback()
    } else {
      isInit = true;
      var oStyle = document.createElement('div')
      oStyle.innerHTML = '\
        <style>@-moz-keyframes easy-rotate{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}@-webkit-keyframes easy-rotate{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}@-o-keyframes easy-rotate{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}@keyframes easy-rotate{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}@-moz-keyframes easy-circular{0%{stroke-dasharray:1,200;stroke-dashoffset:0;}50%{stroke-dasharray:90,150;stroke-dashoffset:-40;}100%{stroke-dasharray:90,150;stroke-dashoffset:-120;}}@-webkit-keyframes easy-circular{0%{stroke-dasharray:1,200;stroke-dashoffset:0;}50%{stroke-dasharray:90,150;stroke-dashoffset:-40;}100%{stroke-dasharray:90,150;stroke-dashoffset:-120;}}@-o-keyframes easy-circular{0%{stroke-dasharray:1,200;stroke-dashoffset:0;}50%{stroke-dasharray:90,150;stroke-dashoffset:-40;}100%{stroke-dasharray:90,150;stroke-dashoffset:-120;}}@keyframes easy-circular{0%{stroke-dasharray:1,200;stroke-dashoffset:0;}50%{stroke-dasharray:90,150;stroke-dashoffset:-40;}100%{stroke-dasharray:90,150;stroke-dashoffset:-120;}}\
          .easy-loading-wrapper{visibility:hidden;transition:0.3s;text-align:center;vertical-align:middle;position:absolute;left:0;right:0;bottom:0;top:0;background:rgba(0,0,0,0.5)}\
          .easy-loading{position:relative;color:#fff;font-size:0;vertical-align:middle;display:inline-block;}.easy-loading-wrapper.hide{opacity:0;}.easy-loading__spinner{position:relative;display:inline-block;width:40px;height:40px;max-width:100%;max-height:100%;vertical-align:middle;animation:easy-rotate 0.8s linear infinite;}.easy-loading__circular{display:block;width:100%;height:100%;}.easy-loading__circular circle{animation:easy-circular 1.5s ease-in-out infinite;stroke:currentColor;stroke-width:3;stroke-linecap:round;}.easy-loading--vertical{display:flex;flex-direction:column;align-items:center;}\
          .elw-box{width: 100px;height:100px;background:rgba(0,0,0,0.7);position:relative;border-radius:5px;flex-direction:column;}\
          .elw-box.hide{background:none;}\
          .easy-center{display:flex;align-items:center;justify-content:center;}\
          .dlw-message{font-size:14px;color:rgba(255,255,255,0.8);margin-top:5px;}\
        </style>\
      ';
      document.body.appendChild(oStyle)
      setTimeout(callback, 30)
    }
  }

  var _wrapper_hide_class = 'easy-loading-wrapper easy-center hide'
  var _wrapper_static_class = 'easy-loading-wrapper easy-center'
  var _OVER_TIME = 60 * 1000

  function createLoading () {
    var oWrapper;
    var oBlockage;
    var oMessage;
    var exist; // 是否存在
    var timer; // 延迟显示
    var timerClose; // 关闭的定时器
    var overtime = _OVER_TIME
    var timerOver; // 超时定时器

    createStyle(function () {
      oWrapper = document.createElement('div')
      oWrapper.className = _wrapper_hide_class
      oWrapper.innerHTML = '\
        <div class="elw-box easy-center hide">\
          '+ _loadingHtml +'\
          <span class="dlw-message"></span>\
        </div>\
      ';
      document.body.appendChild(oWrapper)
      oBlockage = oWrapper.getElementsByClassName('elw-box')[0]
      oMessage = oWrapper.getElementsByClassName('dlw-message')[0]
      exist = true;
    })

    function show (msg, opt) {      
      if(oWrapper) {
        if(opt) {
          if(opt.blockage===true) {
            oBlockage.className = 'elw-box easy-center'
          } else {
            oBlockage.className = 'elw-box easy-center hide'
          }
          if(opt.overtime != null) {
            overtime = opt.overtime
          } else {
            overtime = _OVER_TIME
          }
          
        }
        
        oWrapper.style.visibility = 'visible'
        clearTimeout(timer)
        clearTimeout(timerOver)
        console.log('直接修改', exist)
        if(exist) {
          commitUpdate()
        } else {
          timer = setTimeout(commitUpdate, 200)
        }
        function commitUpdate () {
          exist = true;
          oMessage.innerHTML = msg
          oWrapper.className = _wrapper_static_class
          timerOver = setTimeout(close, overtime)
        }
      }
    }

    function close () {
      
      clearTimeout(timer)
      clearTimeout(timerOver)
      clearTimeout(timerClose)
      timer = null
      if(oWrapper) {
        oWrapper.className = _wrapper_hide_class
        oWrapper.style.visibility = 'hidden'
        timerClose = setTimeout(function(){
          exist = false
        }, 300)
      }
    }

    return {
      show: show,
      close: close
    }
  }

  return createLoading
  
  
  // function show (msg, opt) {
  //   var blockage = opt.blockage === true ? true : false
    
  //   createStyle(function () {
  //     if(oWrapper) {
  //       return update()
  //     } else {
  //       if(!blockage) {
  //         blockage = 'hide'
  //       }
  //     }

  //     oBlockage = oWrapper.getElementsByClassName('elw-box')[0]
  //     oMessage = oWrapper.getElementsByClassName('dlw-message')[0]
      

  //   })
  // }
})();