

/**
 * 数组去重，返回新数组
 * @param {Array} arr 需要去重的数组
 * @param {Boolean} vague [可选]是否模糊去重; 默认：false; false: [3, '3'] => [3,'3']; true: [3, '3'] => [3];   
 */

const getType = require('./getType')
const each = require('./each')

function unique (arr, vague) {
    var result = [];
    var exist = {};
    var keyName = '';
    each(arr, function (_item) {
        if(getType(_item)=='Number' || vague) {
            keyName = _item;
        }else {
            keyName = '"' + _item + '"'; 	
        }
        
        if(!exist[keyName]) {
            exist[keyName] = true;
            result.push(_item);
        }			
    });
    
    return result;
};

module.exports = unique