
/**
 * 判断是否全屏
 * 
 * @return {Boolean}
 */
export default function isFullScreen() {
  return !!(
    document.fullscreen ||
    document.mozFullScreen ||
    document.webkitIsFullScreen ||
    document.webkitFullScreen ||
    document.msFullScreen
  );
}