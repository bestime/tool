import getType from './getType'
import { TYPE_ARRAY, TYPE_OBJECT, TYPE_FUNCTION } from './const'

/**
 * 简单的深拷贝函数，仅支持数组、对象、函数
 * @param {*} data 需要拷贝的数据
 * 
 * @return {*} newData 拷贝的数据
 */
export default function clone(data) {
  var result;
  switch (getType(data)) {
    case TYPE_ARRAY:
      result = [];
      for(var a = 0, len = data.length; a < len; a++) {
        result.push(clone(data[a]));
      }
      break;
    case TYPE_OBJECT:
      result = {};
      for (var key in data) {
        result[key] = clone(data[key]);
      }
      break;
    case TYPE_FUNCTION:
      function newFun() {
        data.apply(this, arguments);
      }
      for (var key in data.prototype) {
        newFun.prototype[key] = data.prototype[key];
      }
      result = newFun;
      break;
    default: result = data
  }
  return result
}


// var tool = (function () {
//   function sayHello () {
//     // 比如这里上千行代码
//   }

//   function close () {

//   }

//   return {
//     sayHello: sayHello,
//     close: close
//   }
// })();

// // 请我我怎么在这里使用 sayHello
// tool.sayHello()