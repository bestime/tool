//获取cookie
function getCookie (key) {
  var arr1 = document.cookie.split('; ');
  for(var i=0; i<arr1.length; i++){
    var arr2 = arr1[i].split('=');
    if(arr2[0]==key){
      return decodeURI(arr2[1]);
    }
  }
}

module.exports = getCookie