function emptyFunction () {}

function overrideConsole () {
  var item;
  for(var key in console) {
    item = console[key]
    if(typeof item === 'function') {
      console[key] = emptyFunction
    }
  }
}

module.exports = overrideConsole