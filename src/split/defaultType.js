const _Array = require('./_Array')
const _Object = require('./_Object')
const _Function = require('./_Function')
const _String = require('./_String')
const _Number = require('./_Number')
const _Boolean = require('./_Boolean')



/**
 * 强制抓换数据类型
 * @param {String} type 需要的数据类型
 * @param {*} [data=null] 判断的数据
 * 
 * @return {*} 理想数据类型的数据
 */
function defaultType (type, data) {
  let res = data
  switch (type) {
    case 'Function': res = _Function(data); break;
    case 'Object': res = _Object(data); break;
    case 'Array': res = _Array(data); break;   
    case 'String': res = _String(data); break;   
    case 'Number': res = _Number(data); break;   
    case 'Boolean': res = _Boolean(data); break;
  }
  
  return res
}

module.exports = defaultType