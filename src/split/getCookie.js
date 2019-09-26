//获取cookie
function getCookie (key) {
  var res, arr2, arr1 = document.cookie.split('; ');
  for(var i = 0; i < arr1.length; i++){
    arr2 = arr1[i].split('=');
    if(arr2[0] == key){
      res = decodeURI(arr2[1]);
      try { res = JSON.parse(res) } catch (e) { }
      return res
    }
  }
}

module.exports = getCookie