

const getType = require('./getType')
const isEqualArray = require('./isEqualArray')
const isFunction = require('./isFunction')

function equal () {
  if(arguments.length < 1) return false;
  var ARG = arguments;
  var res = false
  var FIRST = ARG[0]
  var TYPE = getType(FIRST)
  var HANDLE = ARG[ARG.length - 1]
  if(!isFunction(HANDLE)) {
    HANDLE = false
  }
  
  switch(TYPE) {
    case 'Array':
      var needNumber = HANDLE ? arguments.length - 1 : arguments.length;
      var count = 1;
      for(var a = 1; a < ARG.length; a++) {
        if(isEqualArray(FIRST, ARG[a], HANDLE)) count++
      }
      res = needNumber === count
      break;
  }

  return res
}

module.exports = equal