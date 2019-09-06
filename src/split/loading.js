const isEmpty = require('./isEmpty')
const removeClass = require('./removeClass')
const isObject = require('./isObject')
const removeElement = require('./removeElement')
const getByClass = require('./getByClass')
const getById = require('./getById')
const addClass = require('./addClass')
const _Object = require('./_Object')
const _String = require('./_String')

function oWrapperReady (callback) {
  clearInterval(window.jcy.loading.timer_r)
  clearTimeout(window.jcy.loading.timer_h)
  var oWrapper = getById('loading-bt-wrapper')
  if(oWrapper) {
    callback(oWrapper)
  }else {
    window.jcy.loading.timer_r = setInterval(function () {
      var oWrapper = getById('loading-bt-wrapper')
      if(oWrapper) {
        clearInterval(window.jcy.loading.timer_r)
        callback(oWrapper)
      }
    }, 16)
  }  
}

// 检测是否已存在loading
function useOldLoading (msg) {
  window.jcy = _Object(window.jcy)
  var isUseOld = !isEmpty(window.jcy.loading) && isObject(window.jcy.loading)
  isObject(window.jcy.loading) && oWrapperReady(function (oWrapper) {
    addClass(oWrapper, 'active')
    var oText = getByClass('loading-bt-text', oWrapper)[0]
    msg && (oText.innerHTML = msg);
    // 使用已存在的loading时不改变动画，可能一闪一闪体验不好
  })
  return isUseOld
}

function showLoading (msg, iconHtml) {
  msg = _String(msg) || '加载中'
  iconHtml = _String(iconHtml) || `
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
    <path fill="#fff" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
      <animateTransform attributeType="xml"
        attributeName="transform"
        type="rotate"
        from="0 25 25"
        to="360 25 25"
        dur="0.6s"
        repeatCount="indefinite"/>
      </path>
    </svg>
  `;
  if(useOldLoading(msg, iconHtml)) return false;

  // 上面先检查loading是否实例化
  window.jcy = _Object(window.jcy)
  if(!isObject(window.jcy.loading)) {
    window.jcy.loading = {}
  }

  window.jcy.loading.exist = true

  var el = document.createElement('div')
  el.id = 'loading-bt-wrapper';
  el.innerHTML = `
    <div class="loading-bt-icon">${iconHtml}</div>
    <div class="loading-bt-text">${msg}</div>
    <div class="loading-bt-close">关闭</div>
  `;
  document.body.appendChild(el)
  getByClass('loading-bt-close', el)[0].onclick = hideLoading
  setTimeout(function () {      
    addClass(el, 'active')
  }, 16);
}

function hideLoading () {
  var oWrapper = getById('loading-bt-wrapper')  
  if(oWrapper) {    
    removeClass(oWrapper, 'active')
    window.jcy.loading.timer_h = setTimeout(function () {      
      window.jcy = _Object(window.jcy)
      window.jcy.loading = {}
      removeElement(oWrapper)
      oWrapper = null
    }, 200 + 16)
  }
}

module.exports = {
  show: showLoading,
  close: hideLoading
}