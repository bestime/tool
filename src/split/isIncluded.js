/**
 * 判断元素是否在一维数组里面
 * 注：判断多维数组使用some比较好。请保证各项数据类型正确，此方法内部不作类型判断，可能会报错
 * 
 * @param {*} value 判断的元素
 * @param {Array} list 目标数组
 * @param {Boolean} [isVague=false] 是否模糊判读，比如 1=="1"，将两值转为字符串对比
 * @param {Number} [startIndex=0] 起始索引
 * @param {Number} [endIndex=list.length-1] 结束索引
 * 
 * @return {Boolean} isIn 是否包含在数组里面
 */
function isIncluded (value, list, isVague, startIndex, endIndex) {
  startIndex = startIndex || 0;
  endIndex = endIndex || list.length - 1;
  var res = false;
  for(startIndex; startIndex <= endIndex; startIndex++) {
    res = isVague === true ? String(list[startIndex]) == String(value) : list[startIndex] === value;
    if(res) {
      break;
    }
  }
  return res;
}

module.exports = isIncluded