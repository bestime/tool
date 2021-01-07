const getType = require('./getType')

/**
 * 简单的深拷贝函数，仅支持数组、对象、函数
 * @param {*} data 需要拷贝的数据
 * 
 * @return {*} newData 拷贝的数据
 */
function clone(data) {
  var result;
  switch (getType(data)) {
    case 'Array':
      result = [];
      for(var a = 0, len = data.length; a < len; a++) {
        result.push(clone(data[a]));
      }
      break;
    case 'Object':
      result = {};
      for (var key in data) {
        result[key] = clone(data[key]);
      }
      break;
    case 'Function':
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

module.exports = clone


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