

//删除cookie
export default function removeCookie (key: string): void {
  var oDate = new Date();
  oDate.setTime(oDate.getTime() - 10000000);
  var str = key + '=' + encodeURI('') + ';expires=' + oDate.toUTCString();
  document.cookie = str   
}
