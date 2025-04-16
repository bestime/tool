import { _String, trim } from "@bestime/utils_base";
import fillHtml from "./fillHtml";





let id = 0


/**
 * 创建 <style/> 标签
 * @param className [可选]为创建的标签添加一个类名
 * @return 相同类名 => 修改 , 不同类名 => 追加
 */
export default function createStyle (className: string) {
  id++
  className = trim(className)
  if(!className || /^[0-9]/.test(className)) {
    className = 'bt-style-' + id
  }
  
  var temp, computedCssStr = '', CSS_BOX = document.createElement('style');
  CSS_BOX.className = className;
  document.getElementsByTagName("head")[0].appendChild(CSS_BOX);


  return function (str: string) {
    var find;
    temp = computedCssStr
    _String(str).replace(/(.*?)({.*?})/g, function (_, newKey, newValue) {
      newKey = trim(newKey)
      computedCssStr = computedCssStr.replace(new RegExp('('+ newKey +'\\s*?)({.*?})', 'g'), function () {
        find = true
        return newKey + trim(newValue)
      })
      return '';
    })
    if(find) {
      temp !== computedCssStr && fillHtml(CSS_BOX, computedCssStr)
    } else {
      computedCssStr += _String(str)
      fillHtml(CSS_BOX, computedCssStr)
    }
  }
}
