/**
 * 填充html，兼容<style></style>标签
 * @param {Element} DOM 填充的对象
 * @param {String} htmlStr 填充的html字符串
*/
function fillHtml (DOM, htmlStr) {
  DOM.styleSheet ? DOM.styleSheet.cssText = htmlStr : DOM.innerHTML = htmlStr;
}

module.exports = fillHtml