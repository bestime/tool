/**
 * 获取当前执行js文件所在目录
 * @param {Number} tir 【默认0，当前目录】 向上取几级目录
 */

function getJsPath (tir) {
  tir = tir || 0; 
  var reg = '\/[^/]*', jsPath = document.scripts;
  for (var a = 0; a < tir; a++) {
    reg += reg
  }
	return jsPath[jsPath.length-1].src.replace(new RegExp(reg + '$'), '/');
}

module.exports = getJsPath