
/**
 * 判断是否全屏
 * 
 * @return {Boolean}
 */
function isFullScreen() {
  return !!(
    document.fullscreen ||
    document.mozFullScreen ||
    document.webkitIsFullScreen ||
    document.webkitFullScreen ||
    document.msFullScreen
  );
}

module.exports = isFullScreen