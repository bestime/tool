const isFunction = require('./isFunction')
const getType = require('./getType')
const forEach = require('./forEach')
const defaultType = require('./defaultType')

function filter (data, handle) {
  var TYPE = getType(data)
  if(!isFunction(handle)) return defaultType(TYPE);
  var res;
  switch (TYPE) {
    case 'Array':
      res = []
      forEach(data, function (item, index) {
        handle(item, index) && res.push(item)
      })
      break;
    case 'Object':
      res = {}
      for(var key in data) {
        if(handle(data[key], key)) {
          res[key] = data[key]
        }
      }
      break;
  }
  
  return res
}

module.exports = filter