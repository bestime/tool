import getType from './split/getType'
var prototypeList = {}
import methods from './methods'
import assign from './split/assign'


function CreateMain () {  
  var main = function(v) {
    return new main.fn.init(v);
  }

  main.fn = main.prototype = assign({
    constructor: main,
    version: '2021',
    init: function (d) {
      this.selector = d    
    }
  }, prototypeList)

  main.fn.init.prototype = main.fn

  main.extend = main.fn.extend = function() {
    var args = arguments
    switch (getType(args[0])) {
      case 'Object':
        for (let key in args[0]) {
          this[key] = args[0][key]
        }
        break;
      case 'String':
      case 'Number':
        this[args[0]] = args[1]
        break;
    }
  }

  main.extend(methods)

  return main
}


window['abc'] = CreateMain()
window['test'] = function (a, b) {
  return `${a}=>${b}`
}