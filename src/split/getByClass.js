const getById = require('./getById')
const forEach = require('./forEach')
const hasClass = require('./hasClass')

/**
 * 通过className获取元素
 * 修复了传入父级 undefined 时自动将 body 作为父级的问题
 * 
 * @param {String} className       需要获取的类名
 * @param {Object|String} father   父级对象或者父级ID，如果不传入父级，则父级为body
 * @return {Array}                 返回查找到的所有元素的集合
 */
function getByClass (str, oFather){
  var res;
  if(typeof oFather === 'string') {
    oFather = getById(oFather)
  }

  if (!oFather) {
    oFather = document.body
  }

  if(document.getElementsByClassName) {
    res = oFather.getElementsByClassName(str)
  } else {
    res = []
    forEach(oFather.getElementsByTagName('*'), function (item) {
      hasClass(item, str) && res.push(item)
    })
  }
  return res || []
    // var argLen = arguments.length;
    // var FatherErr = [];
    // if(argLen == 1) {
    //     father = document.body;
    // }else if(argLen == 2) {
    //     var type = getType(father);
    //     if(type == 'String') {
    //         if(father.length) {
    //             father = getById(father);
    //         }else {
    //             return FatherErr;
    //         }
    //     }else if(type == 'Undefined') {
    //         return FatherErr;
    //     }else if(father == null) {
    //         return FatherErr
    //     }
    // }

    // if(document.getElementsByClassName) {                  
    //     return father.getElementsByClassName(className);
    // } else {
    //     var tag = father.getElementsByTagName('*');  
    //     var tagAll = []; 
    //     for(var i=0;i<tag.length;i++){
    //         var classArr = tag[i].className.split(' ')
    //         for (var j=0; j<classArr.length; j++){
    //             if(classArr[j]==className){
    //                 tagAll.push(tag[i]);
    //                 break;
    //             }
    //         }
    //     }
    //     return tagAll;
    // }
}
module.exports = getByClass


