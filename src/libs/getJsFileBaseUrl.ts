/**
 * 获取当前js所在路径
 * @param tir - 向上取几级目录，默认0，当前目录
 * @returns 相对路径
 */
export default function getJsFileBaseUrl(tir: number) {
  tir = tir || 0;
  var reg = '/[^/]*',
    arr = document.scripts;
  for (var a = 0; a < tir; a++) {
    reg += reg;
  }
  return arr[arr.length - 1].src.replace(new RegExp(reg + '$'), '');
}
