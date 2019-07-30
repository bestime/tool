const _Array = require('./_Array')
const _Object = require('./_Object')
const _Function = require('./_Function')

function defaultType (type, data) {
  let res = ''
  switch (type) {
    case 'Function': res = _Function(data); break;
    case 'Object': res = _Object(data); break;
    case 'Array': res = _Array(data); break;      
  }
  
  return res
}

module.exports = defaultType