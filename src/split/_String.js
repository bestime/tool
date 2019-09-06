const getType = require('./getType')
const NAME = 'String'

module.exports = function (data, def) {
  const TEMP = getType(def) === NAME ? def : ''
  
  switch (getType(data)) {
    case 'Number': data = String(data); break;
    case 'Undefined': data = ''; break;
  }
  
  return getType(data)===NAME ? data : TEMP
}