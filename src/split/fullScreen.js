var _Function = require('./_Function')

/**
 * 浏览器全屏控制
 * @param {Element} el 控制节点
 * @param {?Boolean} bol 操做方式：true => 全屏；false => 退出全屏；不填 => 切换
 * @param {?Funciton} callback 返回执行后的状态
 */
function fullScreen(el, bol, callback) {
  callback = _Function(callback)
  if (bol) {
    open()
    callback(true)
  } else {
    close(function (isDone) {
      // 如果bol为undefined 关闭失败就切换全屏
      if (bol !== false) {
        if (isDone) {
          callback(false)
        } else {
          open(el)
          callback(true)
        }
      } else {
        // 返回当前操做状态
        callback(false)
      }
    })
  }
}


function close(callback) {
  callback = _Function(callback)
  if (document.exitFullscreen) {
    document.exitFullscreen().then(function () {
      callback(true)
    }).catch(() => {
      callback(false)
    })
  } else if (document.webkitCancelFullScreen) {
    document.webkitCancelFullScreen();
    callback(true)
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
    callback(true)
  } else if (document.msExitFullscreen) {
    callback(true)
    document.msExitFullscreen();
  }

}

function open(element) {
  // var element = document.documentElement;
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}


module.exports = fullScreen