var ImageViewByPhotoSwipe = (function () {
  var isAppend = false;
  var oElement = document.createElement('div')
  oElement.className = 'pswp'
  oElement.setAttribute('role', 'dialog')
  oElement.setAttribute('aria-hidden', 'true')
  oElement.setAttribute('tabindex', '-1')
  oElement.innerHTML = '\
    <div class="pswp__bg"></div>\
    <div class="pswp__scroll-wrap">\
      <div class="pswp__container">\
        <div class="pswp__item"></div>\
        <div class="pswp__item"></div>\
        <div class="pswp__item"></div>\
      </div>\
      <div class="pswp__ui pswp__ui--hidden">\
        <div class="pswp__top-bar">\
          <div class="pswp__counter"></div>\
          <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>\
          <button class="pswp__button pswp__button--share" title="Share"></button>\
          <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>\
          <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>\
          <div class="pswp__preloader">\
              <div class="pswp__preloader__icn">\
                <div class="pswp__preloader__cut">\
                  <div class="pswp__preloader__donut"></div>\
                </div>\
              </div>\
          </div>\
        </div>\
        <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">\
          <div class="pswp__share-tooltip"></div>\
        </div>\
        <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>\
        <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>\
        <div class="pswp__caption">\
          <div class="pswp__caption__center"></div>\
        </div>\
      </div>\
    </div>\
  ';

  return function (list, options) {
    if(!isAppend) {
      document.body.appendChild(oElement)
      isAppend = true;
    }
    options = options || {
      index: 0
    }
    var gallery = new PhotoSwipe(oElement, PhotoSwipeUI_Default, list, options);
    gallery.init()
  }
})();