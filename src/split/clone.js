const getType = require('./getType')

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
      for (var proName in data.prototype) {
        newFun.prototype[proName] = data.prototype[proName];
      }
      result = newFun;
      break;
    default: result = data
  }
  return result
}

module.exports = clone