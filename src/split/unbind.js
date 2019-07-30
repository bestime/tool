/**
 * 
 * @param {Object} oDom  
 * @param {String} name [必需]，自定义绑定的名字，思量再三，为了兼容ie取消事件,所以需要手动取名
 * @param {String} type 事件类型，如：click,mousemove
 * @param {Function}  [可选] 解绑
 * 				undefined：当前绑定函数。
 * 				handler 同类型，同名函数的上一个缓存函数(手动传入)
 */

function unbind (oDom, name, type, handler){
  try {
    var computedFun = handler || oDom.bindInfo[type][name].handler
    if (oDom.removeEventListener) {        
			oDom.removeEventListener(type, computedFun, false);
    }else if (oDom.detachEvent) {	
    	oDom.detachEvent("on" + type, computedFun);
    }
  }catch(e) {
    return false;
  }
}

module.exports = unbind