//窗口滚动条的距离
function getScrollPosition () {
  return {
    top: document.documentElement.scrollTop || document.body.scrollTop,
    left: document.documentElement.scrollLeft || document.body.scrollLeft
  }
}

module.exports = getScrollPosition