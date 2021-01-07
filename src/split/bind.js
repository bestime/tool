import unbind from './unbind'

/**
 * 绑定事件处理函数，同时可以舍去winFun了
 * 同类型，同名，不同函数，绑定最后一个函数
 * @param {Object} oDom 
 * @param {String} name [必需]，自定义绑定的名字，思量再三，为了兼容ie取消事件,所以需要手动取名
 * @param {String} type 事件类型，如：click,mousemove
 * @param {Function} handler 绑定的事件处理函数
 * @param {Boolean} isRemoveBefore 是否移除上一个同名函数，默认 false 可重复绑定。【注：如果为false，解绑的时候只能解绑最后一个】
 */

export default function bind (oDom, name, type, handler, isRemoveBefore){
  oDom.bindInfo = oDom.bindInfo || {};
  oDom.bindInfo[type] = oDom.bindInfo[type] || {};				
  oDom.bindInfo[type][name] = oDom.bindInfo[type][name] || {};
  oDom.bindInfo[type][name].name = name;
  oDom.bindInfo[type][name].handler = handler;
  
  // 这个方法存在
  if(isRemoveBefore && oDom.bindInfo[type][name].preName == oDom.bindInfo[type][name].name) {
    //先解绑同类型，同名函数，再重新绑定
    unbind(oDom, name, type, oDom.bindInfo[type][name].preHandler);
  }
  
  // 改变this指向
  oDom.bindInfo[type][name].handler = function () {
    handler.apply(oDom, arguments);
  };	
  
  // 最终绑定的函数
  var computedFun = oDom.bindInfo[type][name].handler;
  
  if (oDom.addEventListener) {            
    oDom.addEventListener(type, computedFun, false);
  } else if (oDom.attachEvent) {
    oDom.attachEvent("on" + type, computedFun);
  }

  // 将本次绑定的函数记录下来，下次判断用
  oDom.bindInfo[type][name].preHandler = computedFun;
  oDom.bindInfo[type][name].preName = name;
}