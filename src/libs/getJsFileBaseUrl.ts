export default function getJsFileBaseUrl (tir: number) {
  tir = tir || 0 
  var reg = '\/[^/]*', arr = document.scripts;
  for (var a = 0; a < tir; a++) {
    reg += reg
  }
	return arr[arr.length-1].src.replace(new RegExp(reg + '$'), '');
}