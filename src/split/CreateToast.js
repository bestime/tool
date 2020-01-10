var _Object = require('./_Object')
var _String = require('./_String')
var getByClass = require('./getByClass')
var addClass = require('./addClass')
var removeClass = require('./removeClass')
var getConfig = require('./getConfig')
var setConfig = require('./setConfig')
var _Number = require('./_Number')

var minDuration = 500 // Toast 每一次至少出现500毫秒




var toasName = 'jcy-toast'
var __loading = '<div class="jcy-loading jcy-loading--circular jcy-toast__loading"><span class="jcy-loading__spinner"><svg viewBox="25 25 50 50" class="jcy-loading__circular"><circle cx="50" cy="50" r="20" fill="none"></circle></svg></span></div>'

function CreateToast (opt) {
  var id = _Number(getConfig(toasName)) + 1
  setConfig(id)
  opt = _Object(opt)
  var el = document.createElement('div'), timer1, timer2, timer3, delay_timer, timer4;
  el.className = toasName + ' hidden'
  el.setAttribute('data-id', id)
  el.innerHTML = '<div class="bg"></div><div class="content"></div>'
  document.body.appendChild(el)
  var start_time=0;
  var duration,
  delay,
    mask;

  var oContent = getByClass('content', el)[0]
  

  function show (opt) {
    removeAllTimer()
    opt.msg = opt.msg || ''
    duration = _Number(opt.duration)
    
    delay = _Number(opt.delay)
    if(opt.type === 'loading') {
      addClass(el, 'loading')
      mask = true
      opt.msg = '<div class="ld-wrapper">'+ __loading +'</div>' + opt.msg
    } else {
      removeClass(el, 'loading')
    }
    
    mask = opt.mask === true
    if(mask) {
      addClass(el, 'mask')
    } else {
      removeClass(el, 'mask')
    }
    oContent.innerHTML = _String(opt.msg)
    removeClass(el, 'hidden')
    
    if(delay) {
      delay_timer = setTimeout(readyToShow, delay)
    } else {
      readyToShow()
    }
  }


  function readyToShow () {
    if(!start_time) {
      start_time = +new Date()
    }
    
    timer1 = setTimeout(function () {
      addClass(el, 'open')
      if(duration) {
        timer2 = setTimeout(close, duration)
      }
    }, 30)
  }


  function removeAllTimer () {
    clearTimeout(timer1)
    clearTimeout(timer2)
    clearTimeout(timer3)
    clearTimeout(delay_timer)
    clearTimeout(timer4)
  }
  function close () {
    diff_time = +new Date() - start_time  
    if(diff_time < minDuration) {
      timer4 = setTimeout(commitClose, minDuration - diff_time)
    } else {
      commitClose()
    }
  }

  function commitClose () {
    removeAllTimer()
    timer3 = setTimeout(function () {
      start_time = 0
      addClass(el, 'hidden')
      removeClass(el, ['mask', 'open'])
      oContent.innerHTML = ''
    }, 200)
  }

  return {
    show: show,
    close: close,
    loading: function (msg, delay) {
      delay = _Number(delay)
      show({
        mask: true,
        msg: msg,
        type: 'loading',
        delay: delay || 300
      })
    }
  }
}

module.exports = CreateToast