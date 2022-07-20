import getType from './split/getType'
var prototypeList = {}
import methods from './methods'
import assign from './split/assign'

import { TYPE_STRING, TYPE_NUMBER, TYPE_OBJECT } from './split/basic/constant'


function CreateMain () {  
  var main = function(v) {
    return new main.fn.init(v);
  }

  main.fn = main.prototype = assign({
    constructor: main,
    author: 'Bestime',
    init: function (d) {
      this.selector = d    
    }
  }, prototypeList)

  main.fn.init.prototype = main.fn

  main.extend = main.fn.extend = function() {
    var args = arguments
    switch (getType(args[0])) {
      case TYPE_OBJECT:
        for (let key in args[0]) {
          this[key] = args[0][key]
        }
        break;
      case TYPE_STRING:
      case TYPE_NUMBER:
        this[args[0]] = args[1]
        break;
    }
  }

  main.extend(methods)

  return main
}
export default CreateMain()