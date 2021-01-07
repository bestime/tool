//窗口滚动条的距离
export default function getScrollPosition () {
  return {
    top: document.documentElement.scrollTop || document.body.scrollTop,
    left: document.documentElement.scrollLeft || document.body.scrollLeft
  }
}