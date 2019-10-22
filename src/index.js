const getType = require('./split/getType')
const pro_list =require('./prototype.js')
const methods = require('./methods.js')
const assign = require('./split/assign.js')
const bindEasy = require('./split/bindEasy.js')
const InnerBus = require('./InnerBus')

function CreateMain () {
  var myBus = InnerBus()
  
  bindEasy(document, 'keydown', function (ev) {
    ev = ev || window.event
    switch (ev.keyCode) {
      case 27:
        myBus.emit('ESC');
        break;
    }
  })
  
  var main = function(v) {
    return new main.fn.init(v);
  }
  
  main.fn = main.prototype = assign({
    constructor: main,
    info: 'bestime-tool 2019',
    init: function (d) {
      this.selector = d    
    }
  }, pro_list)
  

  main.fn.init.prototype = main.fn

  main.extend = main.fn.extend = function() {
    switch (getType(arguments[0])) {
      case 'Object':
        for (let key in arguments[0]) {
          this[key] = arguments[0][key]
        }
        break;
      case 'String':
      case 'Number':
        this[arguments[0]] = arguments[1]
        break;
    }
  }

  main.extend(methods)

  return main
}


module.exports = CreateMain()