var openIframe = (function () {
  function removeElement (el) {
    try {
      el.parentNode.removeChild(el)
    } catch(e) {
      
    }
  }


  return function openIframe (defaultTitle, url, parentDomId) {
    var oFather = parentDomId ? document.getElementById(parentDomId) : document.body
    var oWrapper = document.createElement('div')
    oWrapper.className = 'openIframe-wrapper'
    oWrapper.innerHTML = `
      <div class="openIframe-title">
        <span>${defaultTitle}</span>
        <b></b>
      </div>
      <iframe src="${url}"></iframe>
    `
  
    oFather.appendChild(oWrapper)
    const oTitle=  oWrapper.getElementsByClassName('openIframe-title')[0].getElementsByTagName('span')[0]
    const oIframe = oWrapper.getElementsByTagName('iframe')[0]
    // 如果同源，则获取iframe的标题覆盖弹窗标题
    oIframe.contentWindow.addEventListener('load', function () {
      oTitle.innerText = this.document.title
    })
    
    oWrapper.getElementsByTagName('b')[0].onclick = function () {
      removeElement(oWrapper)
    }
  }
})();

