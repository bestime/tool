/**
 * 获取当前执行js文件所在目录
 * @param {Number} [tir=0] 向上取几级目录，默认0，当前目录
 * @return {String} 目录路径
 */

export default function getJsPath (tir) {
  tir = tir || 0 
  var reg = '\/[^/]*', arr = document.scripts;
  for (var a = 0; a < tir; a++) {
    reg += reg
  }
	return arr[arr.length-1].src.replace(new RegExp(reg + '$'), '/');
}