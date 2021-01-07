var createOverlay = (function () {
  var wrapperClassNameStatic = 'jy_overlay_wrapper'
  var wrapperClassNameLayout = wrapperClassNameStatic + ' layout'
  var wrapperClassNameExit = wrapperClassNameLayout + ' exist'
  var wrapperClassNameActive = wrapperClassNameExit + ' active'
  var toasatClassName = 'jy-toast-wrapper'

  var LOADING_HTML = '<div class="jy-loading"><span class="jy-loading__spinner"><svg viewBox="25 25 50 50" class="jy-loading__circular"><circle cx="50" cy="50" r="20" fill="none"></circle></svg></span></div>'

  function getHalfOffsetPositionX (oBox) {
    return -oBox.offsetWidth / 2 + 'px'
  }

  function getHalfOffsetPositionY (oBox) {
    return -oBox.offsetHeight / 2 + 'px'
  }

  function main (oContent, options) {
    options = options || {}
    var mask = options.mask===false ?false : true // 是否显示遮罩
    var oFather = options.oFather || document.body // 父级容器
    var showDelay = Math.max(30, options.showDelay || 30) // 延迟显示（显示前遮罩也不能点击）
    var duration = options.duration || 0 // 持续时间
    var customClassName = options.customClassName // 自定义根className



    var transition = 500
    var oWrapper = document.createElement('div')
    var oMain = document.createElement('div')
    oMain.className = 'jy_overlay_main'
    setWrapperClassName(wrapperClassNameStatic)
    var isExist; // 是否显示中
    var timerShow, timerClose, timer_autoClose, timer_lay;

    if (mask) {
      var oBg = document.createElement('div')
      oWrapper.appendChild(oBg)
      oBg.className = 'jy_overlay_bg'
    }    

    oMain.appendChild(oContent)
    oWrapper.appendChild(oMain)
    oFather.appendChild(oWrapper)

    function clearAllTimer () {
      clearTimeout(timerShow)
      clearTimeout(timerClose)
      clearTimeout(timer_autoClose)
      clearTimeout(timer_lay)
    }

    function updatePosition () {
      oMain.style['margin-left'] = getHalfOffsetPositionX(oMain)
      oMain.style['margin-top'] = getHalfOffsetPositionY(oMain)
    }

    function show () {
      clearAllTimer()
      !isExist && setWrapperClassName(wrapperClassNameLayout)
      timer_lay = setTimeout(function () {
        !isExist && setWrapperClassName(wrapperClassNameExit)
        updatePosition()
        timerShow = setTimeout(function () {
          setWrapperClassName(wrapperClassNameActive)
          isExist = true;
          checkAutoClose()
        }, showDelay)
      }, 30)
    }

    // 自动关闭
    function checkAutoClose () {
      if(duration>0) {
        timer_autoClose = setTimeout(close, duration)
      }
    }

    function close () {
      clearAllTimer()
      setWrapperClassName(wrapperClassNameExit)
      isExist = false
      timerClose = setTimeout(function () {
        setWrapperClassName(wrapperClassNameStatic)
      }, transition)
    }

    function setWrapperClassName (name) {
      oWrapper.className = name + ' ' + customClassName
    }

    return {
      show: show,
      close: close
    }
  }

  main.toast = function (options) {
    var oToast = document.createElement('div')
    var oText = document.createElement('p')
    oToast.className = toasatClassName
    if(options.loading === true) {
      oToast.innerHTML = LOADING_HTML
      oToast.className += ' ts-loading'
    }
    
    oToast.appendChild(oText)
    var iMain = main(oToast, options)

    return {
      show: function (text) {
        if(text !== oText.innerHTML) {
          oText.innerHTML = text || ''
        }
        iMain.show()
      },
      close: iMain.close
    }
  }

  main.loading = function (options) {
    var oLoading = document.createElement('div')
    oLoading.className = 'jy-loading-wrapper'
    oLoading.innerHTML = LOADING_HTML
    var oText = document.createElement('p')
    oLoading.appendChild(oText)
    var iMain = main(oLoading, options)
    var defaultLabel = options.defaultLabel || ''
    
    return {
      show: function (text) {
        text = text || defaultLabel
        if(text !== oText.innerHTML) {
          oText.innerHTML = text
        } 
        iMain.show()
      },
      close: iMain.close
    }
  }

  return main 
})();
