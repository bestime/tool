const DomContentLoaded = 'DOMContentLoaded'
const OnreadyStateChange = 'onreadystatechange'


/**
 * 文档加载完成【仅指文档就绪，图片等资源可能没有加载完成】
 * @param {Function} callback 加载完成的回调
 */
function ready (callback) {
  var arg = arguments;
  if (document.addEventListener) {
    document.addEventListener(DomContentLoaded, function () {
      document.removeEventListener(DomContentLoaded, arg.callee, false);
      callback();
    }, false)
  } else if (document.attachEvent) {
    document.attachEvent(OnreadyStateChange, function () {
      if (document.readyState == 'complete') {
        document.detachEvent(OnreadyStateChange, arg.callee);
        callback();
      }
    })
  } else if (document.lastChild == document.body) {
    callback();
  } else if(document.lastElementChild && document.lastElementChild === document.firstElementChild) {
    callback();
  }
}

module.exports = ready