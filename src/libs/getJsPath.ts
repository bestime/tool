
import defaultValue from './defaultValue'

/**
 * 获取当前执行js文件所在目录
 * @param {Number} [tir=0] 当前目录向上取几级目录
 * @return {String} 目录路径
 */
 export default function getJsPath (tir: number): string {
  tir = defaultValue(tir, 0)
  var reg = '\/[^/]*', arr = document.scripts;
  for (var a = 0; a < tir; a++) {
    reg += reg
  }
	return arr[arr.length-1].src.replace(new RegExp(reg + '$'), '/');
}