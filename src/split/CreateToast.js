var _Object = require('./_Object')
var _String = require('./_String')
var getByClass = require('./getByClass')
var addClass = require('./addClass')
var removeClass = require('./removeClass')
var getConfig = require('./getConfig')
var setConfig = require('./setConfig')
var _Number = require('./_Number')




var toasName = 'jcy-toast'
var __loading = '<div class="jcy-loading jcy-loading--circular jcy-toast__loading"><span class="jcy-loading__spinner jcy-loading__spinner--circular"><svg viewBox="25 25 50 50" class="jcy-loading__circular"><circle cx="50" cy="50" r="20" fill="none"></circle></svg></span></div>'

function CreateToast (opt) {
  var id = _Number(getConfig(toasName)) + 1
  setConfig(id)
  opt = _Object(opt)
  var el = document.createElement('div'), timer1, timer2, timer3;
  el.className = toasName + ' hidden'
  el.setAttribute('data-id', id)
  el.innerHTML = '<div class="bg"></div><div class="content"></div>'
  document.body.appendChild(el)

  var duration,
    mask;

  var oContent = getByClass('content', el)[0]
  

  function show (opt) {
    removeAllTimer()
    opt.msg = opt.msg || ''
    duration = _Number(opt.duration)

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
  }
  function close () {
    removeAllTimer()
    timer3 = setTimeout(function () {
      addClass(el, 'hidden')
      removeClass(el, ['mask', 'open'])
      oContent.innerHTML = ''
    }, 200)
  }

  return {
    show: show,
    close: close,
    loading: function (msg) {
      show({
        mask: true,
        msg: msg,
        type: 'loading'
      })
    }
  }
}

module.exports = CreateToast